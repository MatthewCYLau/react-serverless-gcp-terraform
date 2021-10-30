# Reserve an external IP
resource "google_compute_global_address" "external_ip" {
  name         = "app-lb-ip"
  provider     = google
  address_type = "EXTERNAL"
  ip_version   = "IPV4"
  project      = var.project
  description  = "External static IP address for React app"
}

output "external_ip" {
  value       = google_compute_global_address.external_ip.address
  description = "External static IP address for React app"
}