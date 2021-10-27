terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

terraform {
  backend "gcs" {
    bucket = "react-serverless-gcp-terraform-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {

  credentials = file(var.credentials_filepath)

  project = var.project
  region  = "europe-west2"
  zone    = "europe-west2-a"
}
