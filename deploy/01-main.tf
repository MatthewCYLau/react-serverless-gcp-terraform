terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.1.0"
    }
  }
}

terraform {
  backend "gcs" {
    bucket = "react-serverless-tf-state-001"
    prefix = "terraform/state"
  }
}

provider "google" {

  region  = var.region
  zone    = var.zone
  project = var.project
}

provider "google-beta" {

  region  = var.region
  zone    = var.zone
  project = var.project

}

locals {
  required_tags = {
    project     = var.project_name,
    environment = var.environment
  }
  tags = merge(var.resource_tags, local.required_tags)
}