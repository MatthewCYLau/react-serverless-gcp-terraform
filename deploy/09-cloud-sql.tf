resource "google_sql_database_instance" "db_instance" {
  name       = "react-serverless-gcp-database-instance"
  region     = var.region

  settings {
    tier              = "db-f1-micro"
    availability_type = "REGIONAL"
    user_labels = {
      "Environment" : "production"
    }

    ip_configuration {
      ipv4_enabled    = true
      private_network = google_compute_network.vpc_network.self_link
    }

  }
  database_version    = "POSTGRES_13"
  deletion_protection = "true"
}

resource "google_sql_database" "db" {
  name       = "react-serverless-gcp-database"
  instance = google_sql_database_instance.db_instance.id
}

data "google_secret_manager_secret_version" "postgresql_database_password" {
  provider = google-beta
  secret = "postgresql-database-password" 
}

resource "google_sql_user" "postgresql_database_user" {
  name     ="postgresql-database-user" 
  instance = google_sql_database_instance.db_instance.id
  password = data.google_secret_manager_secret_version.postgresql_database_password.secret_data
}