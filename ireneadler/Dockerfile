FROM node:20.18.0

WORKDIR /ireneadler

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
