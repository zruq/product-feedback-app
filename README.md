# Installation

First, install all required dependencies:

npm install

Create a .env file inside the / folder having the following structure:

DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL = http://localhost:3000 # or the link to your website


# Next Auth Github Provider
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

If you want to remove or add auth providers, you have to modify the following files : /src/env/schema.mjs and /src/pages/api/auth/[...nextauth].ts.
