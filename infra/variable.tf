variable "aws_region" {
  default = "us-east-1"
}

variable "cf_price_class" {
  default = "PriceClass_100"
}

variable "cf_min_ttl" {
  default = 0 
}

variable "cf_default_ttl" {
  # 5min
  default = 3600
}

variable "cf_max_ttl" {
  # 24h 
  default = 86400
}
