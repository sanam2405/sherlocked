FROM node:20.18.0

RUN useradd -ms /bin/bash sherlockholmes
# /home/sherlockholmes \

WORKDIR /home/sherlockholmes

COPY package*.json /home/sherlockholmes/

RUN npm install

COPY . .

USER sherlockholmes

RUN npm run build

CMD [ "npm", "start" ]
