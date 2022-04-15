FROM node:12.18.1
WORKDIR /home/ubuntu/BlockchainCode
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "distribute.js"]
