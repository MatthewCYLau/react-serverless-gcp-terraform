resource "google_storage_bucket" "static-site" {
  name          = var.bucket_name
  location      = "EUROPE-WEST2"
  storage_class = "STANDARD"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
  }
}

resource "google_storage_bucket_access_control" "public_rule" {
  bucket = google_storage_bucket.static-site.name
  role   = "READER"
  entity = "allUsers"
  depends_on = [
    google_storage_bucket_iam_policy.bucket_iam_policy
  ]
}

data "google_iam_policy" "viewer" {
  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}

resource "google_storage_bucket_iam_policy" "bucket_iam_policy" {
  bucket      = google_storage_bucket.static-site.name
  policy_data = data.google_iam_policy.viewer.policy_data
}