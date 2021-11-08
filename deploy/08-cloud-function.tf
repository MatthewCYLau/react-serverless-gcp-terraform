resource "google_storage_bucket" "cloud_functions" {
  name          = "react-serverless-cloud-functions-bucket"
  force_destroy = true
  location      = "EUROPE-WEST2"
  storage_class = "STANDARD"
  labels        = local.tags
}

module "cloud-function" {
  source      = "./modules/cloud-function"
  source_dir  = "./cloud-functions/create-user"
  name        = "create-user"
  entry_point = "createUser"
  google_storage_bucket_name = google_storage_bucket.cloud_functions.name
}

/*
locals {
  cloud_functions = {
    "get-todos"   = { bucket = google_storage_bucket.cloud_functions.name, source = "cloud-functions/get-todos/get-todos-function.zip" },
    "create-todo" = { bucket = google_storage_bucket.cloud_functions.name, source = "cloud-functions/create-todo/create-todo-function.zip" },
    "create-user" = { bucket = google_storage_bucket.cloud_functions.name, source = "cloud-functions/create-user/create-user-function.zip" },
  }
}

resource "google_storage_bucket_object" "cloud_functions" {
  for_each = local.cloud_functions
  name     = each.key
  bucket   = each.value.bucket
  source   = each.value.source
}

resource "google_cloudfunctions_function" "get_todos" {
  name          = "get-todos"
  description   = "Get todos Cloud function"
  runtime       = "nodejs14"
  max_instances = 1

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.cloud_functions.name
  source_archive_object = google_storage_bucket_object.cloud_functions["get-todos"].name
  trigger_http          = true
  timeout               = 60
  entry_point           = "readRows"
}

resource "google_cloudfunctions_function" "create_todo" {
  name          = "create-todo"
  description   = "Create todo Cloud function"
  runtime       = "nodejs14"
  max_instances = 1

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.cloud_functions.name
  source_archive_object = google_storage_bucket_object.cloud_functions["create-todo"].name
  trigger_http          = true
  timeout               = 60
  entry_point           = "writeRow"
}

resource "google_cloudfunctions_function" "create_user" {
  name          = "create-user"
  description   = "Create user Cloud function"
  runtime       = "nodejs14"
  max_instances = 1

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.cloud_functions.name
  source_archive_object = google_storage_bucket_object.cloud_functions["create-user"].name
  trigger_http          = true
  timeout               = 60
  entry_point           = "createUser"

  environment_variables = {
    DB_HOST = "${google_sql_database_instance.db_instance.public_ip_address}:5432"
    DB_USER = google_sql_user.postgresql_database_user.name
    DB_PASS = google_sql_user.postgresql_database_user.password
    DB_NAME = google_sql_database.db.name
  }
}

resource "google_cloudfunctions_function_iam_member" "invoke_get_todos" {
  cloud_function = google_cloudfunctions_function.get_todos.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}

resource "google_cloudfunctions_function_iam_member" "invoke_create_todos" {
  cloud_function = google_cloudfunctions_function.create_todo.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}


resource "google_cloudfunctions_function_iam_member" "invoke_create_users" {
  cloud_function = google_cloudfunctions_function.create_user.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
*/