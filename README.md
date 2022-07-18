# STAR API

To run the aplication you need to execute the following command :

```sh
./run.sh dev-environment-cpu
```


It will create the followings containers :

- Frontend ->  Angular 14
- Backend  ->  API created with Express
- DB       ->  PostgreSQL 14.1

Is also possible to execute the docker-compose file manually without using the file run.sh:

```sh
DOCKER_BUILDKIT=1 docker-compose -f docker-compose.dev.cpu.yml up --detach --build
```