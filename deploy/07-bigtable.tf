resource "google_bigtable_instance" "instance" {
  name = "react-serverless-instance"

  cluster {
    cluster_id   = "react-serverless-cluster"
    num_nodes    = 1
    storage_type = "HDD"
  }

  labels = {
    environment = "production"
  }

  lifecycle { prevent_destroy = false }
  deletion_protection = false
}

resource "google_bigtable_table" "table" {
  name          = "users-table"
  instance_name = google_bigtable_instance.instance.name

  lifecycle {
    prevent_destroy = false
  }

  column_family {
    family = "stats_summary"
  }
}