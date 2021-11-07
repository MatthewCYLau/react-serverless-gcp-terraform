output "create_todo_cloud_function_trigger_url" {
  value       = google_cloudfunctions_function.create_todo.https_trigger_url
  description = "Create todo Cloud Function trigger URL"
}

output "get_todos_cloud_function_trigger_url" {
  value       = google_cloudfunctions_function.get_todos.https_trigger_url
  description = "Get todos Cloud Function trigger URL"
}

output "create_user_cloud_function_trigger_url" {
  value       = google_cloudfunctions_function.create_user.https_trigger_url
  description = "Create user Cloud Function trigger URL"
}