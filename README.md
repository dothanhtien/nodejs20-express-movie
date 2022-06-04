# Online Movie Ticket Booking System

## I. Installation

1. Clone or download from github: `https://github.com/dothanhtien/nodejs20-express-movie.git`
2. Add `.env` file in the root folder
3. Copy `.env file content` in the section II to your `.env` file
4. To install packages => Run command: `yarn`
5. To add file storage folder => Run command: `yarn setup`
6. To init database and generate seeds => Run command: `yarn db:init`

Other commands:

1.  To destroy the tables and rerun migration and seed scripts `yarn db:reset`

## II. .env file content

```
NODE_ENV="development"

BASE_URL="http://localhost:8080"
PORT=8080

DEV_DB_USERNAME="root"
DEV_DB_PASSWORD=null
DEV_DB_DATABASE="dev_database"
DEV_DB_HOST="127.0.0.1"
DEV_DB_DIALECT="mysql"

PROD_DB_USERNAME="root"
PROD_DB_PASSWORD=null
PROD_DB_DATABASE="prod_database"
PROD_DB_HOST="127.0.0.1"
PROD_DB_DIALECT="mysql"

JWT_SECRET="secret-key"
JWT_TOKEN_EXPIRATION=86400

CLOUDINARY_CLOUD_NAME="cloud_name"
CLOUDINARY_API_KEY="api_key"
CLOUDINARY_API_SECRET="api_secret"
CLOUDINARY_FOLDER_NAME="omtbs"
```
