resource "google_sql_database_instance" "db_instance" {
  name   = "${var.project_name}-db-005"
  region = var.region

  settings {
    tier              = "db-f1-micro"
    availability_type = "REGIONAL"
    user_labels = {
      "environment" : "production"
    }

    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "public"
        value = "0.0.0.0/0"
      }
    }

  }
  database_version    = "POSTGRES_13"
  deletion_protection = "false"
}

resource "google_sql_database" "db" {
  name     = "react-serverless-gcp-database"
  instance = google_sql_database_instance.db_instance.id
}

data "google_secret_manager_secret_version" "postgresql_database_password" {
  provider = google-beta
  secret   = var.database_password_secret_name
}

resource "google_sql_user" "postgresql_database_user" {
  name     = "postgresql-database-user"
  instance = google_sql_database_instance.db_instance.id
  password = data.google_secret_manager_secret_version.postgresql_database_password.secret_data
}