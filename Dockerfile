FROM node:alpine AS builder
WORKDIR /usr/src/mantichor-frontend
COPY . .
RUN npm install && \
    npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/mantichor-frontend/dist /usr/share/nginx/html
