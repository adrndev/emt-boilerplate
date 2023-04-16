FROM node:14.19

WORKDIR /home/node/app

RUN ls -la

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

CMD ["npm", "run", "start"]