# Online Movie Ticket Booking System

## I. Installation

1. Clone or download from github: `https://github.com/dothanhtien/nodejs20-express-movie.git`
2. Add `.env` file in the root folder
3. Run command: `yarn`

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

TEST_DB_USERNAME="root"
TEST_DB_PASSWORD=null
TEST_DB_DATABASE="test_database"
TEST_DB_HOST="127.0.0.1"
TEST_DB_DIALECT="mysql"

PROD_DB_USERNAME="root"
PROD_DB_PASSWORD=null
PROD_DB_DATABASE="prod_database"
PROD_DB_HOST="127.0.0.1"
PROD_DB_DIALECT="mysql"

JWT_SECRET="secret-key"
JWT_TOKEN_EXPIRATION=86400
```
