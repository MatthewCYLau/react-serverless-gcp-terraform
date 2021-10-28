resource "google_storage_bucket" "static-site" {
  name          = var.bucket_name
  location      = "EUROPE-WEST2"
  storage_class = "STANDARD"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
  }
}

resource "google_storage_default_object_access_control" "website_read" {
  bucket = google_storage_bucket.static-site.name
  role   = "READER"
  entity = "allUsers"
}