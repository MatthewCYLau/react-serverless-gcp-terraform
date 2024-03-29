resource "google_cloudbuild_trigger" "github_push_trigger" {

  name     = "gcp-source-trigger"
  filename = "cloudbuild.yaml"

  trigger_template {
    branch_name = "master"
    repo_name   = var.cloud_source_repo_name
  }

  substitutions = {
    _BUCKET_NAME            = local.bucket_name
    _REACT_APP_API_BASE_URL = "${module.cloud-function["api"].cloud_function_trigger_url}"
  }
}