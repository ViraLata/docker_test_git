# /bin/bash
set -e # exit when any command fails

current_path="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
current_name="$(date +"%Y-%m-%d_%H-%M-%S")"


dev-environment-cpu(){
    clear
    echo '..:: dev-environment-cpu ::..'
    DOCKER_BUILDKIT=1 docker-compose -f docker-compose.dev.cpu.yml down
    DOCKER_BUILDKIT=1 docker-compose -f docker-compose.dev.cpu.yml up --detach --build
}


"$@"