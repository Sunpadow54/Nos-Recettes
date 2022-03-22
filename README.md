# Nos Recettes (temporary name)


## Projet 

Extranet to share recipes with friends & family !  
(work in progress 🙈 🎉)


## Install

node version 16.7.0
- front : <kbd> :file_folder: nos-recettes-front </kbd>
- back : <kbd> :file_folder: nos-recettes-back </kbd>

`npm install`


### Environment variables


#### <ins>Backend</ins>

Create a <kbd>📄 development.env</kbd> file at the root of <kbd>📁 nos-recettes-back</kbd> folder.

sample : [^1]
```
NODE_ENV=development
PORT=YOUR_PORT

DB_HOST=YOUR_HOST
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USERNAME
DB_PASS=YOUR_DB_PASWWORD

TOKEN_KEY=YOUR_SECRET_JWTOKEN_KEY

EMAIL_CRYPTO_KEY=SECRET_22_LENGTH_KEY
```

[^1]: ⚠️ EMAIL_CRYPTO_KEY must contain exactly 22 characters.


>For testing with **Jest**, you must create a <kbd>📄 test.env</kbd> file and set `NODE_ENV=test`.  
>⚠️ **Warning :** use an other database for testing purpose `DB_NAME=YOUR_DB_TEST_NAME`.


#### <ins>Frontend</ins>

Create a <kbd>📄 .env</kbd> file at the root of <kbd>📁 nos-recettes-front</kbd> folder.

```
PORT=YOUR_PORT
REACT_APP_URL_API=URL_BACKEND_API
```


## Deploy Project Locally

<kbd> 📂 nos-recettes-front </kbd> :  
- To acces dev server : `npm run start`

<kbd> 📂 nos-recettes-back </kbd> :  
- `npm run dev`


## Docs

[SQL dump](config/db_dump-postgresql.sql)

[see bakend queries](docs/api_specifications.pdf) (in progress)


## :package: Made with

* Sass
* React 17.0.2
* Node Js 
    * Express
* Database : postgresql


## Author

Sunpadow54 - elsa dessarps - 2021

-----------------


![visuel home nos Recettes](/docs/sample_nos-recettes_home.jpg "visuel exemple dashboard")

![visuel form nos Recettes](/docs/sample_nos-recettes_form.jpg "visuel exemple create recipe")