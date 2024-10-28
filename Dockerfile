# Use a imagem base do Node.js
FROM node:18-alpine as build-stage

# Set the working directory
WORKDIR /src

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Build a aplicação
RUN npm run build

# Use uma imagem do Nginx para servir o frontend
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]
