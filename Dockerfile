FROM node:20-alpine AS development

WORKDIR /src/app

COPY package.json yarn.lock ./
COPY prisma/schema.prisma ./prisma/
RUN yarn install

# Copia o código fonte
COPY . .

RUN yarn run build

FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --from=development /src/app/package.json /src/app/yarn.lock ./
COPY --from=development /src/app/prisma ./prisma/
COPY --from=development /src/app/dist ./dist

RUN yarn install --production

EXPOSE 8000

CMD ["yarn", "start:prod"]
