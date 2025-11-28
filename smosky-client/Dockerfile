# use node 18 alpine image
FROM node:18-alpine

# create work directory in app folder
WORKDIR /app

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY package.json /app/
#COPY package-lock.json /app/

RUN npm install


# copy over all files to the work directory
ADD . /app

#ENV NUXT_BASE_URL_BOILERPLATE_SERVER='http://164.92.92.132:8080'

# build the project
RUN npm run build

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
EXPOSE 3000

# run the build project with node
ENTRYPOINT ["node", ".output/server/index.mjs"]