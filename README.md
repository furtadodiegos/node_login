# node_login

### Technologies
 - Backend
     - NodeJS
     - ExpressJS
     - Mongoose
     - Airbnb-Lint

### Architecture
 - Backend
    - The architecture is business oriented(User and Authorization), each entity has your own managers (Controllers, Middleware, model, seeds, tests, route, ...)
    - Settings (environments, database connection, routes, etc ...) are in the configs directory

### Include An Authorization Header
All requests should use an **Authorization header** to work:

```js
fetch(
    url,
    {
        headers: { 'Authorization': 'token' }
    }
)
```

### Routes
| Endpoints                      | Usage                         | Params  |
| -------------                  |:-------------:                | -----:  |
| `GET /api/healthcheck`         | Verify if api is online       |         |
| `POST /api/singup`             | Registry a new User           | **nome** - [String] <br>**email:** [String] <br>**senha:** [String] <br>**telefones:** [Array][Object]{**numero:** [String] <br>**ddd:** [String]}|
| `POST /api/signin`             | Login                         | **email** - [String] <br>**senha:** [String] |
| `POST /api/users/:userId`      | Get details of a single user  | **email** - [String] <br>**senha:** [String] |
