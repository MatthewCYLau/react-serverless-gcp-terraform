# GCP Serverless React App

A reference project to deploy a static React app onto Google Cloud Storage, [Cloud Build](https://cloud.google.com/cloud-build) as the CI/CD tool, and Cloud Functions as serverless back-end, referencing [this](https://cloud.google.com/storage/docs/hosting-static-website-http) GCP documentation

App URL [here](https://matlau.co.uk/)

## Pre-requisites

- You own a domain via [Google Domains](https://domains.google/intl/en-GB/)
- You have created a project repository on [Cloud Source Repositories](https://cloud.google.com/source-repositories)
- You have installed [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli):

```bash
terraform -help # prints Terraform options
```

## Domain set-up

- Add the GCP credentials JSON `client_email` as an owner of the domain. See Cloud Storage documentation [here](https://cloud.google.com/storage/docs/domain-name-verification#additional_verified_owners)

## Configurations

- Populate the variables in `terraform.tfvars`

```bash
project                = <GCP-PROJECT-ID>
credentials_filepath   = <PATH-TO-GCP-SERVICE-ACCOUNT>
bucket_name            = <STATIC-SITE-BUCKET-NAME>
cloud_source_repo_name = <CLOUD-SOURCE-REPOSITORY-NAME>
# and other variables
```

- Create a secret on [Secret Manager](https://cloud.google.com/secret-manager) for Cloud SQL database password

## Deploy

```bash
cd deploy # change to deploy directory
terraform init # initialises Terraform
terraform apply # deploys GCP stack
terraform destroy # destroys GCP stack
```

## Build/run app locally

- Create a `.env` file with the following, and place at project root directory:

```bash
REACT_APP_API_BASE_URL=<CLOUDFUNCTION-TRIGGER-URL>
```

- Run `npm run start` and visit aapp at `http://localhost:3000`

## Domain configuration

- Creat an A record and point it to the external static IP address. See reference GCP documentaion [here](https://cloud.google.com/storage/docs/hosting-static-website#connect-domain)

## Connect to Cloud SQL

- Connect to Cloud SQL to view database tables:

```bash
psql postgresql://postgresql-database-user:<DB-PASSWORD>@<CLOUD-SQL-IP>:5432/react-serverless-gcp-database
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
