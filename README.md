## Sacar una cuenta de desarrollador en spotify

https://developer.spotify.com/dashboard/login


## multi lenguaje
Documentacion
https://restcountries.eu/#api-endpoints-language

Muestra todos los paises que hablan español
GET: https://restcountries.eu/rest/v2/lang/es

## Token Spotiapp
https://developer.spotify.com/documentation/general/guides/authorization-guide/

Client Credentials Flow

1. Have your application request authorization
The request is sent to the /api/token endpoint of the Accounts service:

POST https://accounts.spotify.com/api/token

Params:
```
grant_type : client_credentials
client_id
client_secret
```

The body of this POST request must contain the following parameters encoded in application/x-www-form-urlencoded as defined in the OAuth 2.0 specification:

REQUEST BODY PARAMETER	VALUE
grant_type	Required.
Set it to client_credentials.
The header of this POST request must contain the following parameter:

HEADER PARAMETER	VALUE
Authorization	Required.
Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic <base64 encoded client_id:client_secret>


## Informacion de las API

https://developer.spotify.com/console/ 

entrar en el menu Browse y podemos probar las distintos endpoints

Muestra los nuevos lanzamientos
https://api.spotify.com/v1/browse/new-releases

## Obtener un artista
Documentación en spotify
https://developer.spotify.com/console/get-artist/

endpoint:
https://api.spotify.com/v1/artists/{id}


## Obtener top tracks
Documentación en spotify
https://developer.spotify.com/console/get-artist-top-tracks/

endpoint:
https://api.spotify.com/v1/artists/{id}/top-tracks?country=us


## Widgets de spotify
Documentación en spotify
https://developer.spotify.com/documentation/widgets/guides/adding-a-widget/#standard-html-pages

play button
https://developer.spotify.com/documentation/widgets/generate/play-button/

##Publicar en github pages
```
npm i -g angular-cli-ghpages
ng build --prod --base-href "https://jcvaldes.github.io/ngspoti/"
npx ngh --dir=dist/ngspoti
```
