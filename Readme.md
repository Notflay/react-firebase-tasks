# Para usarlo con docker

1. Creas el archivo "Dockerfile" y copias esto:

FROM node:12

WORKDIR /app

COPY package\*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000
doc
CMD [ "npm", "dev" ]

2. docker build -t [name] .
3. docker run -d --rm -p 5173:5173 --name [name] [name] 
4. docker login -u [nick]
5. docker tag [name]:latest [nick]/dockerhub:[name]
6. docker push [nick]/dockerhub:[name]
