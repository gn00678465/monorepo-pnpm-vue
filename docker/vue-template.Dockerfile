FROM node:20-alpine as builder

ENV WORKDIR=/code

WORKDIR $WORKDIR

RUN corepack enable

ADD . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @pnpm-monorepo-vue/vue-template build


RUN pnpm --filter @pnpm-monorepo-vue/vue-template builder

FROM devforth/spa-to-http:latest

COPY --from=builder /code/apps/vue-template/dist/ . 

