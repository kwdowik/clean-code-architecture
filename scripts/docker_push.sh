NAME=kwdowik/score-api
TAG=$(git log -1 --pretty=%h)
IMG=${NAME}:${TAG}
LATEST=${NAME}:latest
# login:
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
# build:
docker build -t ${IMG} .
docker tag ${IMG} ${LATEST}
# push:
docker push ${NAME}
