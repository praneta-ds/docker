# stage 1:build
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production 
COPY . .

# stage2:runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "index.js"]
