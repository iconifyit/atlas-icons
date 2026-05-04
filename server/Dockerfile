FROM node:16

ENV DATABASE_URL=mongodb://localhost/vectopus-icons
ENV jWT_PRIVATE_KEY=jwtPrivateKey
ENV PORT=5000
ENV UPLOAD_DIR =../public/uploads/icons/
ENV TEMP_DIR =../public/uploads/

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["node server"]