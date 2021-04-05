output "aws_iam_access_id" {
    value = aws_iam_access_key.ci_key.id
}

output "aws_iam_access_key" {
    value = aws_iam_access_key.ci_key.secret
}

output "aws_s3_bucket_name" {
    value = aws_s3_bucket.bucket.id
}

output "cf_distribution_id" {
    value = aws_cloudfront_distribution.cf_distribution.id
}

output "cf_distribution_domain_url" {
  value = "https://${aws_cloudfront_distribution.cf_distribution.domain_name}"
}

output "oai_id" {
    value = aws_cloudfront_origin_access_identity.oai.id
}
