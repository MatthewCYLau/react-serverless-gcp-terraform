resource "google_storage_bucket" "cloud_functions" {
  name = "react-serverless-cloud-functions-bucket"
}

resource "google_storage_bucket_object" "get_todos_function" {
  name   = "get-todos-function.zip"
  bucket = google_storage_bucket.cloud_functions.name
  source = "cloud-functions/get-todos/get-todos-function.zip"
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
  entry_point           = "helloWorld"
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  cloud_function = google_cloudfunctions_function.get_todos.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}

output "cloud_function_trigger_url" {
  value       = google_cloudfunctions_function.get_todos.https_trigger_url
  description = "Get todos Cloud Function trigger URL"
}