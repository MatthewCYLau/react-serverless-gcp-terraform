resource "random_id" "cloud_function_bucket_suffix" {
  byte_length = 4
}

resource "google_storage_bucket" "cloud_functions" {
  name          = "${var.project_name}-cloud-function-${random_id.cloud_function_bucket_suffix.hex}"
  force_destroy = true
  location      = "EUROPE-WEST2"
  storage_class = "STANDARD"
  labels        = local.tags
}

locals {
  cloud_functions = {
    "api" = { source_dir = "./functions/api", entry_point = "app", environment_variables = {
      DB_HOST = "${google_sql_database_instance.db_instance.private_ip_address}:5432"
      DB_USER = google_sql_user.postgresql_database_user.name
      DB_PASS = google_sql_user.postgresql_database_user.password
      DB_NAME = google_sql_database.db.name
    } },
  }
}

resource "google_vpc_access_connector" "cloud_function_connector" {
  provider      = google-beta
  name          = "vpc-connector"
  machine_type  = "e2-micro"
  min_instances = 2
  max_instances = 3
  subnet {
    name = google_compute_subnetwork.subnet.name
  }
}

module "cloud-function" {
  for_each                   = local.cloud_functions
  source                     = "./modules/cloud-function"
  source_dir                 = each.value.source_dir
  name                       = each.key
  entry_point                = each.value.entry_point
  google_storage_bucket_name = google_storage_bucket.cloud_functions.name
  environment_variables      = each.value.environment_variables
  vpc_connector              = google_vpc_access_connector.cloud_function_connector.id
}

output "cloud_functions_trigger_urls" {
  value = module.cloud-function
}