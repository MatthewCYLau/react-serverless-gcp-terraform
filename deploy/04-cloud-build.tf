resource "google_cloudbuild_trigger" "github-push-trigger" {

  name     = "gcp-source-trigger"
  filename = "cloudbuild.yaml"

  trigger_template {
    branch_name = "master"
    repo_name   = "github_matthewcylau_react-terraform-gcp-cloud-build"
  }
}