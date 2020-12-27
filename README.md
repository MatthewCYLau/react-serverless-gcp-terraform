# React App on Google Cloud Storage

A reference project to deploy a static React app onto Google Cloud Storage with Terraform and Cloud Build

Referencing [this](https://cloud.google.com/storage/docs/hosting-static-website-http) GCP documentation

## Pre-requisites

- You own a domain via [Google Domains](https://domains.google/intl/en-GB/)
- You have created a project repository on [Cloud Source Repositories](https://cloud.google.com/source-repositories)
- You have installed [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli):

```bash
terraform -help # prints Terraform options
```

## Domain set-up

- Connect your domain to Cloud Storage via a `CNAME` record. See Cloud Storage documentation [here](https://cloud.google.com/storage/docs/hosting-static-website-http#cname)
- Add the GCP credentials JSON `client_email` as an owner of the domain. See Cloud Storage documentation [here](https://cloud.google.com/storage/docs/domain-name-verification#additional_verified_owners)

## Configurations

- Update the variables in `02-variables.tf`:

```bash
variable "project" {
  default = <your_gcp_project_id>
}

variable "credentials_filepath" {
  default = <path_to_gcp_credentials_json>
}

variable "bucket_name" {
  default = <your_gcp_cloud_storage_bucket_name>
}

variable "cloud_source_repo_name" {
  default=<your_gcp_cloud_source_repo_name>
}
```

- Update the build command in `cloudbuild.yaml` with your bucket name i.e. `args: ["-m", "cp", "-r", "build/*", "gs://<your_gcp_cloud_storage_bucket_name>"]`

## Deploy

```bash
cd deploy # change to deploy directory
terraform init # initialises Terraform
terraform apply # deploys GCP stack
terraform destroy # destroys GCP stack
```

- In project root directory, commit to `master` to trigger build:

```bash
git commit --allow-empty -m "Trigger pipeline"
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
