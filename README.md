# EGogoHub User API

## Prerequisities
1. NodeJS
2. PostgreSQL

## How To Run
1. Create env file
    - Create the env file by copy the example
        ```sh
        cp .env.example .env
        ```
    - Write down the value of env files
    ```sh
        NAME="EGogoHub User API"
        PORT=PORT # Service Port

        DB_HOST=DB_HOST #PostgreSQL Host
        DB_PORT=DB_PORT #PostgreSQL Port
        DB_USERNAME=DB_USER #PostgreSQL Username
        DB_PASSWORD=DB_PASSWORD #PostgreSQL Password
        DB_NAME=DB_NAME #PostgreSQL DB Name

        DB_MAX_IDLE_CONNECTION=DB_MAX_IDLE_CONNECTION #PostgreSQL Max Idle Connection
        DB_MAX_OPEN_CONNECTION=DB_MAX_OPEN_CONNECTION #PostgreSQL Max Open Connection
        DB_CONNECTION_MAX_LIFE_TIME=DB_CONNECTION_MAX_LIFE_TIME #PostgreSQL Connection Max Lifetime
        DB_LOG_MODE=DB_LOG_MODE # Log mode for DB. Set true if the query printed
    ```
2. Install the dependencies by running
    ```sh
    npm i
    ```
3. Run the migration for create the tables in the db by
    ```sh
    npm run migrate:config && npm run migrate:up
    ```
4. Run the service by
    ```sh
    npm start
    ```

## REST API Docs

### Create User (POST /users)
#### Description
Endpoint to create user.
#### Request
##### Body
```json
{
    "name": "", // user's name. Required.
    "email": "" // user's email. Required.
}
```

#### Response (201)
```json
{
    "ok": true,
    "message": "Success",
    "data": {
        "name": "", // user's name
        "email": "", // user's email
        "created_at": "",
        "updated_at": ""
    }
}
```

#### Response (400)
##### Bad Request
It will return 400 for error of required field checking and wrong request body
```json
{
    "ok": false,
    "message": "bad request",
    "data": {
        "error": "bad request"
    }
}
```

#### Response (409)
```json
{
    "ok": false,
    "message": "conflict error",
    "data": {
        "error": "conflict error"
    }
}
```

#### Response (500)
##### Internal Server Error
```json
{
    "ok": false,
    "message": "internal server error",
    "data": {
        "error": "internal server error"
    }
}
```

### Update User by ID (PUT /users/:id)
#### Description
Endpoint to update user by id.
#### Request
##### Body
```json
{
    "name": "", // user's name. Required
    "email": "" // user's email. Required
}
```

#### Response (200)
```json
{
    "ok": true,
    "message": "Success",
    "data": {
        "name": "", // user's name
        "email": "", // user's email
        "created_at": "",
        "updated_at": ""
    }
}
```

#### Response (400)
##### Bad Request
It will return 400 for error of required field checking and wrong request body
```json
{
    "ok": false,
    "message": "bad request",
    "data": {
        "error": "bad request"
    }
}
```

#### Response (409)
```json
{
    "ok": false,
    "message": "conflict error",
    "data": {
        "error": "conflict error"
    }
}
```

#### Response (500)
##### Internal Server Error
```json
{
    "ok": false,
    "message": "internal server error",
    "data": {
        "error": "internal server error"
    }
}
```

### Get Paginated Users (GET /users)
#### Description
Endpoint to get paginated users
#### Request
##### Query Params
1. `page=`: the page of the user list
2. `limit=`: the limit number of each page
3. `sorts=`: the sorting list of the user list. If the sort is sorted by DESC, add `-`.
    * `created_at`, `-created_at`: sort the user list by the created at
4. `name=`: filter the useer by the name.
5. `email=`: filter the useer by the email.
#### Response (200)
```json
{
    "ok": true,
    "message": "Success",
    "data": {
        "page": 0, // the current page
        "limit": 0, // the limit of current page
        "sorts": [""], // the sort list
        "next": false, // the next availability. If true, there is next page.
        "items": [
            {
                "name": "", // user's name
                "email": "", // user's email
                "created_at": "",
                "updated_at": "" 
            },
            //...
        ]
    }
}
```

#### Response (400)
##### Bad Request
It will return 400 for error of required field checking and wrong request body
```json
{
    "ok": false,
    "message": "bad request",
    "data": {
        "error": "bad request"
    }
}
```

#### Response (500)
##### Internal Server Error
```json
{
    "ok": false,
    "message": "internal server error",
    "data": {
        "error": "internal server error"
    }
}
```