terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {

  credentials = file(var.credentials_filepath)

  project = var.project
  region  = "europe-west2"
  zone    = "europe-west2-a"
}
