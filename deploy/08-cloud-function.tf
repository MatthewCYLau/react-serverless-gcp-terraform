resource "google_storage_bucket" "cloud_functions" {
  name = "react-serverless-cloud-functions-bucket"
}

resource "google_storage_bucket_object" "get_todos_function" {
  name   = "get-todos-function.zip"
  bucket = google_storage_bucket.cloud_functions.name
  source = "cloud-functions/get-todos/get-todos-function.zip"
}

resource "google_storage_bucket_object" "create_todo_function" {
  name   = "create-todo-function.zip"
  bucket = google_storage_bucket.cloud_functions.name
  source = "cloud-functions/create-todo/create-todo-function.zip"
}

resource "google_cloudfunctions_function" "get_todos" {
  name          = "get-todos"
  description   = "Get todos Cloud function"
  runtime       = "nodejs14"
  max_instances = 1

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.cloud_functions.name
  source_archive_object = google_storage_bucket_object.get_todos_function.name
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
  source_archive_object = google_storage_bucket_object.create_todo_function.name
  trigger_http          = true
  timeout               = 60
  entry_point           = "writeRow"
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