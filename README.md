# GCP Serverless React App

A reference project to deploy a static React app onto Google Cloud Storage, [Cloud Build](https://cloud.google.com/cloud-build) as the CI/CD tool, and Cloud Functions as serverless back-end, referencing [this](https://cloud.google.com/storage/docs/hosting-static-website-http) GCP documentation

App URL here: [`https://www.gcpserverless.com/`](https://www.gcpserverless.com/)

![GCP Architecture](img/gcp-architecture.png)

## Pre-requisites

- You own a domain via [Cloud DNS](https://cloud.google.com/dns?hl=en)
- You have created a project repository on [Cloud Source Repositories](https://cloud.google.com/source-repositories)
- You have installed [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli):

```bash
terraform -help # prints Terraform options
```

## Domain set-up

- Verify domain ownership for the domain-named bucket. See Cloud Storage documentation [here](https://cloud.google.com/storage/docs/domain-name-verification#additional_verified_owners)

## Configurations

- Populate the variables in `terraform.tfvars`

```bash
project                = <GCP-PROJECT-ID>
bucket_name            = <STATIC-SITE-BUCKET-NAME>
cloud_source_repo_name = <CLOUD-SOURCE-REPOSITORY-NAME>
# and other variables
```

- Create a secret on [Secret Manager](https://cloud.google.com/secret-manager) for Cloud SQL database password

## Deploy

```bash
gcloud auth application-default login # authenticate with GCP
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

- In Cloud DNS, creat A records for both `<YOUR-DOMAIN>`, and `*.<YOUR-DOMAIN>` and point them to the external static IP address. See reference GCP documentaion [here](https://cloud.google.com/storage/docs/hosting-static-website#connect-domain)

## Connect to Cloud SQL

- Connect to Cloud SQL to view database tables:

```bash
psql postgresql://postgresql-database-user:<DB-PASSWORD>@<CLOUD-SQL-IP>:5432/react-serverless-gcp-database
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

If you find this project helpful, please give a :star: or even better buy me a coffee :coffee: :point_down: because I'm a caffeine addict :sweat_smile:

<a href="https://www.buymeacoffee.com/matlau" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
