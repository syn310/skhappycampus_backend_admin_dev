FROM necronia/node-pm2
RUN mkdir -p /home/node/app
RUN mkdir -p /usr/share/zoneinfo

WORKDIR /home/node/app

#CMD echo 151.101.16.162 registry.npmjs.org >> /etc/hosts; supervisord -n;

COPY . .

RUN mv ./localtime /etc/

RUN yarn --offline

#RUN npm ci --only=production

CMD [ "pm2-runtime", "npm", "--", "start" ]
