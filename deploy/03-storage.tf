resource "google_storage_bucket" "static_site" {
  name          = var.bucket_name
  location      = "EUROPE-WEST2"
  storage_class = "STANDARD"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }
  labels = local.tags
}

resource "google_storage_default_object_access_control" "web_read" {
  bucket = google_storage_bucket.static_site.name
  role   = "READER"
  entity = "allUsers"
}