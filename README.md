# api-exercise
## Purpose
This Node.JS/Express app is a API lab server to train on how to call APIs using node-fetch or Postman

## Installation
### Prerequisites
- Node.JS 10.16.x or above
- NPM

### How to install
1/ Clone this git repository or download the zip into a folder

2/ Go inside this folder

3/ run `npm install`

## How to run
run `npm start`
The web server will listen on port 3000.
E.g. http://localhost:3000/api

## API description
### /api [GET]
Ping-like function which returns a JSON object - meant to test connectivity

### /api/public [GET]
Return a text file

### /api/login [POST]
Request must contain as body a JSON object {username: <username>, password: <password>}.
There is only one valid set of credentials:
- username: **user1**
- password: **complex**

Return a JSON object as response body confirming success as well as an authorization key in the response header *cookie*

--
*Note: all other API calls below require authentication by passing in the request a header* ***X-AUTH*** *containing the authorization key received during the login process*

### /api/logout [POST] [require authentication]
Logout and discard the authorization token

### /api/priv [GET] [require authentication]
Ping-like function which returns a JSON object - meant to test connectivity while authenticated

### /apit/priv/\<colour\> [GET] [require authentication]
Return a JPEG file depending on the colour provided.

Only valid colours are red and yellow.
