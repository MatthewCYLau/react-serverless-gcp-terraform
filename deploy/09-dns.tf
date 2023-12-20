data "google_dns_managed_zone" "gcpserverless" {
  provider = google
  name     = "gcpserverless-com"
}

resource "google_dns_record_set" "domain" {
  provider     = google
  name         = data.google_dns_managed_zone.gcpserverless.dns_name
  type         = "A"
  ttl          = 300
  managed_zone = data.google_dns_managed_zone.gcpserverless.name
  rrdatas      = [google_compute_global_address.external_ip.address]
}

resource "google_dns_record_set" "www_domain" {
  provider     = google
  name         = "www.gcpserverless.com."
  type         = "A"
  ttl          = 300
  managed_zone = data.google_dns_managed_zone.gcpserverless.name
  rrdatas      = [google_compute_global_address.external_ip.address]
}