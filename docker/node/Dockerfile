FROM node:20

WORKDIR /src

COPY ./langs/node/package.json /src/package.json
RUN npm install

CMD ["tail", "-f", "/dev/null"]
