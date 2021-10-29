resource "google_cloudbuild_trigger" "github-push-trigger" {

  name     = "gcp-source-trigger"
  filename = "cloudbuild.yaml"

  trigger_template {
    branch_name = "master"
    repo_name   = var.cloud_source_repo_name
  }

  substitutions = {
    _BUCKET_NAME = var.bucket_name
  }
}