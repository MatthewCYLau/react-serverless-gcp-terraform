resource "google_compute_router" "nat-router-europe-west2" {
  name    = "nat-router-europe-west2"
  region  = var.region
  network = google_compute_network.vpc.name
}

resource "google_compute_router_nat" "nat-config" {
  name                               = "nat-config"
  router                             = google_compute_router.nat-router-europe-west2.name
  region                             = var.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}