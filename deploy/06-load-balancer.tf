# Add the bucket as a CDN backend
resource "google_compute_backend_bucket" "static_site" {
  provider    = google
  name        = "static-site-backend"
  description = "Contains files needed by the website"
  bucket_name = google_storage_bucket.static_site.name
  enable_cdn  = true
}

# Create HTTPS certificate
resource "google_compute_managed_ssl_certificate" "web" {
  provider = google-beta
  name     = "ssl-certificate"
  project  = var.project
  managed {
    domains = ["matlau.co.uk"]
  }
}

# GCP URL MAP HTTPS
resource "google_compute_url_map" "web_https" {
  provider        = google
  name            = "web-url-map-https"
  default_service = google_compute_backend_bucket.static_site.self_link
}

# GCP target proxy HTTPS
resource "google_compute_target_https_proxy" "web_https" {
  provider         = google
  name             = "web-target-proxy-https"
  url_map          = google_compute_url_map.web_https.self_link
  ssl_certificates = [google_compute_managed_ssl_certificate.web.self_link]
}

# GCP forwarding rule HTTPS
resource "google_compute_global_forwarding_rule" "web_https" {
  provider              = google
  name                  = "web-forwarding-rule-https"
  load_balancing_scheme = "EXTERNAL"
  ip_address            = google_compute_global_address.external_ip.address
  ip_protocol           = "TCP"
  port_range            = "443"
  target                = google_compute_target_https_proxy.web_https.self_link
}