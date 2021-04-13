provider "aws" {
  version = "~> 2.0"
  region  = var.aws_region
}

locals {
  project_id = "kittygrams-b1"
  s3_origin_id = "kittygram-origin-dev"
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "CF origin identity"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${local.project_id}-dev-assets-original"
  acl    = "private"

  website {
      index_document = "index.html"
      error_document = "index.html"
  }

  tags = {
    Name = "${local.project_id}-dev-assets"
  }
}

resource "aws_s3_bucket" "bucket_experiment" {
  bucket = "${local.project_id}-dev-assets-experiment"
  acl    = "private"

  website {
      index_document = "index.html"
      error_document = "index.html"
  }

  tags = {
    Name = "${local.project_id}-dev-assets-experiment"
  }
}

data "aws_iam_policy_document" "read_bucket_policy_original" {
  statement {
    sid       = "AllowCloudFrontS3ReadOriginal"
    actions   = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.bucket.arn}/*"
    ]
    principals {
      type        = "AWS"
      identifiers = [
        aws_cloudfront_origin_access_identity.oai.iam_arn
      ]
    }
  }
}

data "aws_iam_policy_document" "read_bucket_policy_experiment" {
  statement {
    sid       = "AllowCloudFrontS3ReadExperiment"
    actions   = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.bucket_experiment.arn}/*"
    ]
    principals {
      type        = "AWS"
      identifiers = [
        aws_cloudfront_origin_access_identity.oai.iam_arn
      ]
    }
  }
}

resource "aws_s3_bucket_policy" "s3_allow_read_access_original" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.read_bucket_policy_original.json
}

resource "aws_s3_bucket_policy" "s3_allow_read_access_experiment" {
  bucket = aws_s3_bucket.bucket_experiment.id
  policy = data.aws_iam_policy_document.read_bucket_policy_experiment.json
}

resource "aws_cloudfront_distribution" "cf_distribution" {
    origin {
        domain_name = aws_s3_bucket.bucket.bucket_regional_domain_name
        origin_id = local.s3_origin_id 

        s3_origin_config {
            origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.oai.id}"
        }
    }

    enabled = true
    is_ipv6_enabled     = true
    comment             = "kittygram CF distribtion"
    default_root_object = "/app/latest/index.html"


    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = local.s3_origin_id

        lambda_function_association {
          event_type   = "viewer-request"
          lambda_arn   = "${aws_lambda_function.edge_viewer_request.arn}:1"
          include_body = false
        }

        lambda_function_association {
          event_type   = "origin-request"
          lambda_arn   = "${aws_lambda_function.edge_origin_request.arn}:1"
          include_body = false
        }

        forwarded_values {
          query_string = false
          cookies {
            forward = "whitelist"
            whitelisted_names = ["source"]
          }
        }

        viewer_protocol_policy = "redirect-to-https"
        min_ttl                = var.cf_min_ttl
        default_ttl            = var.cf_default_ttl
        max_ttl                = var.cf_max_ttl
    }

    # Redirect all navigation outside of expected to home
    custom_error_response {
        error_caching_min_ttl = 0
        error_code = 403
        response_code = 200
        response_page_path = "/app/latest/index.html"
    }

    price_class = var.cf_price_class

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    tags = {
        Environment = "production"
    }

    viewer_certificate {
        cloudfront_default_certificate = true
  }
}

## Access Key for CI only with specific permission to access resources

### 1. Access to sync with S3
### 2. Access to create invalidation with cloudfront

resource "aws_iam_user" "ci_user" {
    name = "ci-server-user"
}

resource "aws_iam_access_key" "ci_key" {
    user = aws_iam_user.ci_user.name
}

data "aws_iam_policy_document" "ci_server_access" {
    version = "2012-10-17"
    statement {
        actions = [
            "s3:GetBucketLocation",
            "s3:GetObject",
            "s3:ListBucket",
            "s3:PutObject",
            "s3:DeleteObject"
        ]
        effect = "Allow"
        resources = [
            aws_s3_bucket.bucket.arn,
            aws_s3_bucket.bucket_experiment.arn,
            "${aws_s3_bucket.bucket.arn}/*",
            "${aws_s3_bucket.bucket_experiment.arn}/*"
        ]
    }
    statement {
        actions = [
            "cloudfront:CreateInvalidation"
        ]
        effect = "Allow"
        resources = [
            aws_cloudfront_distribution.cf_distribution.arn
        ]
    }
}

resource "aws_iam_user_policy" "ci_user_policy" {
    name = "ci-user-policy"
    user = aws_iam_user.ci_user.name
    policy = data.aws_iam_policy_document.ci_server_access.json
}



### Lamdda Edge 

resource "aws_s3_bucket" "edge_functions" {
  bucket        = "edge-function-assets"
  acl           = "private"
  region        = "${var.aws_region}"

  tags = {
    Name        = "Dev Bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_object" "source" {
  bucket = aws_s3_bucket.edge_functions.id
  key = "main-edge-functions"
  source = "../packages/lambdas/edge-functions.zip"
  etag = "${filemd5("../packages/lambdas/edge-functions.zip")}"
}


data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = [
        "lambda.amazonaws.com",
        "edgelambda.amazonaws.com"
      ]
    }
  }
}


resource "aws_iam_role" "lambda_role" {
  name                 = "AllowLambdaLogs"
  assume_role_policy   = data.aws_iam_policy_document.lambda_assume_role.json
  description          = "IAM Role with permissions to provide lambda permission to CW logs"
}

resource "aws_lambda_function" "edge_origin_request" {
  function_name = "edge-origin-request" 
  s3_bucket = aws_s3_bucket.edge_functions.id
  s3_key = aws_s3_bucket_object.source.id
  handler = "src/origin-request/index.handler"
  role = aws_iam_role.lambda_role.arn
  timeout = 30
  publish = true

  source_code_hash = "${filebase64sha256("../packages/lambdas/edge-functions.zip")}"

  runtime = "nodejs12.x"
  depends_on = [
    "aws_iam_role_policy_attachment.attach_lambda_role_logs",
    "aws_cloudwatch_log_group.origin_request_logs"
  ]
}

resource "aws_lambda_function" "edge_viewer_request" {
  function_name = "edge-viewer-request" 
  s3_bucket = aws_s3_bucket.edge_functions.id
  s3_key = aws_s3_bucket_object.source.id
  handler = "src/viewer-request/index.handler"
  role = aws_iam_role.lambda_role.arn
  timeout = 5 
  publish = true

  source_code_hash = "${filebase64sha256("../packages/lambdas/edge-functions.zip")}"

  runtime = "nodejs12.x"
  depends_on = [
    "aws_iam_role_policy_attachment.attach_lambda_role_logs",
    "aws_cloudwatch_log_group.viewer_request_logs"
  ]
}

resource "aws_cloudwatch_log_group" "origin_request_logs" {
    name = "/aws/lambda/origin-requests"
    retention_in_days = 1
}

resource "aws_cloudwatch_log_group" "viewer_request_logs" {
    name = "/aws/lambda/viewer-requests"
    retention_in_days = 1
}


data "aws_iam_policy_document" "lambda_cw_log_policy" {
    version = "2012-10-17"
    statement {
        actions = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ]
        effect = "Allow"
        resources = ["arn:aws:logs:*:*:*"]
    }
}

resource "aws_iam_policy" "lambda_logging" {
    name = "lambda_logging"
    path = "/"
    description = "IAM Policy for logging from a lambda"
    policy = data.aws_iam_policy_document.lambda_cw_log_policy.json
}

resource "aws_iam_role_policy_attachment" "attach_lambda_role_logs" {
    role = aws_iam_role.lambda_role.name
    policy_arn = aws_iam_policy.lambda_logging.arn
}

