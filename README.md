# Nos Recettes (temporaire)

## Projet 

Site de recettes pour les partager avec ses amis .


(work in progress :see_no_evil: :tada:)

## Installation

node version 16.7.0
- front : <kbd> :file_folder: nos-recettes-front </kbd>
- back : <kbd> :file_folder: nos-recettes-back </kbd>

```
npm install 
```

### Environment variable

Créer un fichier <kbd>📄development.env</kbd> dans le dossier <kbd>📁backend</kbd>, pour tester en local.


sample[^1] :

```
NODE_ENV=development
PORT=YOUR_PORT

DB_HOST=YOUR_HOST
DB_NAME=YOUR_DB_USERNAME
DB_USER=YOUR_DB_USERNAME
DB_PASS=YOUR_DB_PASWWORD

TOKEN_KEY=YOUR_SECRET_JWTOKEN_KEY

EMAIL_CRYPTO_KEY=SECRET_22_LENGTH_KEY
```

[^1]: :warning: l' EMAIL_CRYPTO_KEY doit contenir exactement 22 caractères


>Pour tester l'app avec *Jest* créer un autre fichier <kbd>📄test.env</kbd> (NODE_ENV=test). :warning: Attention d'utiliser une autre base de donnée (DB_NAME) pour les tests)


## Lancer le projet en local

<kbd> :file_folder: nos-recettes-front </kbd> :

- Pour avoir accès au serveur de développement : `npm run start`

<kbd> :file_folder: nos-recettes-back </kbd> :

- `npm run start`


## Docs

[SQL dump](config/db_dump-postgresql.sql)

[voir les routes de l'api](docs/api_specifications.pdf) (en cours)

## :package: Made with

* Sass
* React 17.0.2
* Node Js 
    * Express
* Database : postgresql

## Auteur

Sunpadow - elsa dessarps - 2021

-----------------


![visuel home nos Recettes](/docs/sample_nos-recettes_home.jpg "visuel exemple dashboard")

![visuel form nos Recettes](/docs/sample_nos-recettes_form.jpg "visuel exemple créer une recette")