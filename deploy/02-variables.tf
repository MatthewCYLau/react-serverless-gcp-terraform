variable "project" {
  default = "react-gke-terraform"
}

variable "credentials_filepath" {
  default = "/Users/matthewlau/gcp-creds/gcp-creds.json"
}

variable "bucket_name" {
  default = "www.matlau.co.uk"
}

variable "cloud_source_repo_name" {
  default = "github_matthewcylau_react-terraform-gcp-cloud-build"
}