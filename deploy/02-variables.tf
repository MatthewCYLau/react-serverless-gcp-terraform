variable "project" {
  description = "GCP project ID"
}

variable "credentials_filepath" {
  description = "Local path to GCP service account key"
}

variable "bucket_name" {
  description = "Name of tatic site storage bucket"
}

variable "cloud_source_repo_name" {
  description = "GCP cloud source repository name"
}

variable "region" {
}

variable "zone" {
}