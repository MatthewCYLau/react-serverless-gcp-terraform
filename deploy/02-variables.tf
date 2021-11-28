variable "project" {
  description = "GCP project ID"
}

variable "project_name" {
  type        = string
  description = "Project name"
}

variable "bucket_name" {
  description = "Name of tatic site storage bucket"
}

variable "cloud_source_repo_name" {
  description = "GCP cloud source repository name"
}

variable "region" {
  description = "GCP region"
}

variable "zone" {
  description = "GCP zone"
}

variable "database_password_secret_name" {
  description = "Cloud SQL PostgreSQL database password secret name"
}

variable "environment" {
  description = "Name of the environment."
  type        = string
  default     = "dev"
}

variable "resource_tags" {
  description = "Tags to set for all resources"
  type        = map(string)
  default = {
    project     = "my-project",
    environment = "dev"
  }
}