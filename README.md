## Description

[Repository here](https://github.com/DesenvTech/microServices.git).

## Installation

```bash
$ docker-compose up --build -d
```

## Open Keycloak

[http://localhost:8080/auth](http://localhost:8080/auth).
```bash
username: admin
password: admin
```

## Open Swagger

[http://localhost:3000/api](http://localhost:3000/api).

## Import collection to Postman

Import **postman_collection.json** file to Postman.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Export JSON form Keycloak server
### 1. Exec into master keycloak server
```
docker exec -it KEYCLOAK-CONTAINER-ID /bin/sh
```

### 2. Run exporting script

```
cd /opt/jboss/keycloak &&
    bin/standalone.sh \
    -Dkeycloak.migration.action=export\
    -Djboss.socket.binding.port-offset=1\
    -Dkeycloak.migration.realmName=microservices \
    -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
    -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=data-keycloak.json;
```

### Create user attribute
<!-- https://stackoverflow.com/questions/32678883/keycloak-retrieve-custom-attributes-to-keycloakprincipal -->

## More info

[claudinei-de-lima@hotmail.com](claudinei-de-lima@hotmail.com).