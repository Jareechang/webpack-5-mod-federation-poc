provider "aws" {
  version = "~> 2.0"
  region  = var.aws_region
}

locals {
  project_id = "kittygram"
  s3_origin_id = "kittygram-origin-dev"
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "CF origin identity"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${local.project_id}-dev-assets"
  acl    = "private"

  website {
      index_document = "index.html"
      error_document = "index.html"
  }

  tags = {
    Name = "${local.project_id}-dev-assets"
  }
}

data "aws_iam_policy_document" "read_bucket_policy" {
  statement {
    sid       = "AllowCloudFrontS3Read"
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

resource "aws_s3_bucket_policy" "s3_allow_read_access" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.read_bucket_policy.json
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

        forwarded_values {
            query_string = false
            cookies {
                forward = "none"
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
            "${aws_s3_bucket.bucket.arn}/*"
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
