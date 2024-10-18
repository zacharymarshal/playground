FROM golang:1.23.1

WORKDIR /src

COPY ./langs/go/go.mod /src/go.mod
RUN go mod download

CMD ["tail", "-f", "/dev/null"]
