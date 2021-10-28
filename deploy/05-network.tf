# Reserve an external IP
resource "google_compute_global_address" "website" {
  name         = "app-lb-ip"
  provider     = google
  address_type = "EXTERNAL"
  ip_version   = "IPV4"
  project      = var.project
  description  = "External static IP address for React app"
}

output "website_ip" {
  value       = google_compute_global_address.website.address
  description = "External static IP address for React app"
}