FROM node:20.18.0

RUN useradd -ms /bin/bash sherlocked
# /home/sherlocked \

WORKDIR /home/sherlocked

COPY package*.json /home/sherlocked/

RUN npm install

COPY . .

USER sherlocked

CMD [ "npm", "run", "dev" ]
