# Webpack 5: Module Federation (proof of concept) 

Testing out the module federation in webpack 5.

This is an experimental project and it is not intended for production use. 

Proof of concept of isolated application stitched together with webpack 5 module federation. 
- [Getting started](#getting-startd)  
- [Production](#production)  
- [Project Summary](#project-summary)  
- [Architeture](#architecture)  
- [A/B testin](#ab-testing)  
- [Technologies](#technologies)  
- [Resources](#resources)  

## Getting started


#### 1. Starting the apps 

```sh
// Install deps
yarn

// Within root directory
yarn run start

// Visit http://localhost:4000

```
## Production 

### 1. Create infrastructure (via terraform) 

```sh
terraform plan

terraform apply -auto-approve

// Get the output vars and add to your github secrets for your actions 
```

#### Note: Remember to run `terraform destroy -auto-approve` after your finish to not incur any charges from AWS

### 2. Setup Build Environments Variables (Github actions)

These need to be set on the github secrets for your workflows to work. These will all be available and created via terraform.

|  Name        | Description    |
| ------------- |:-------------:| 
| WEBSITE_HOST  | Website domain or cloudfront domain |
| AWS_ACCESS_KEY_ID  | Build AWS Access key id |
| AWS_SECRET_ACCESS_KEY  | Build AWS Access key |
| AWS_S3_BUCKET_NAME  | S3 bucket name where the assets are synced to |
| AWS_CF_DISTRIBUTION_ID  | Cloudfront distribution id |

## Project Summary 

Kittygram. View and search for photos of cats, and manage your account.


#### Teams

Teams are divided are split up into respective functions. 

1. Marketing Team    - Host application (home page, common, and tying everything together)
2. Accounts Team     - Account Flows (profiles, login, logout, favourites etc)
3. Search Team       - Search Flows (Search results, display) 


## Architecture 

Separate delivery pipeline which allows for independent releases in the holistic web application.

Even though the teams and projects are separate, the code base is shared via monorepo (lerna).


## AB testing

Included Lambda@Edge functions to randomly weight the page being served from two s3 buckets (original and experiment).

- View Request - Randomly adds cookie `source=` to `Origin-Response` 
- Origin Response - Handles the fetching data from the origin (s3 bucket), the lambda determines which page to be served based the cookie value


#### Overview of architecture 

![Kittygram architecture](./assets/mfe-kittygram.svg "Kittygram architecture")

## Technologies

- [Webpack](https://github.com/webpack/webpack) Version ^5.4.0 
- [React](https://github.com/facebook/react) Version ^17.0.1 
- [React DOM](https://github.com/facebook/react) Version ^17.0.1 
- [React Router](https://github.com/ReactTraining/react-router)
- [Material UI](https://github.com/mui-org/material-ui) Version ^4.11.0 
- AWS (cloudfront, s3)
- Terraform 

## Resources

- [Webpack 5 Module Federation: A game-changer in JavaScript architecture](https://indepth.dev/webpack-5-module-federation-a-game-changer-in-javascript-architecture/)
- [Webpack 5 Documentation](https://webpack.js.org/concepts/module-federation/)
- [Webpack 5 and Module Federation - A Microfrontend Revolution](https://dev.to/marais/webpack-5-and-module-federation-4j1i)
