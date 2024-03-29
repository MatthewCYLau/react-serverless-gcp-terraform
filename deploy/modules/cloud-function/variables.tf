variable "name" {}
variable "entry_point" {}
variable "google_storage_bucket_name" {
  type        = string
  default     = ""
  description = "Cloud Storage bucket name for Cloud Function"
}

variable "source_dir" {
  type        = string
  default     = ""
  description = "Source directory of Cloud Function"
}

variable "environment_variables" {
  type        = map(any)
  default     = {}
  description = "Map of Cloud Function environment variables"
}


variable "vpc_connector" {
  type        = string
  default     = ""
  description = "VPC Network Connector fully-qualified URI"
}
