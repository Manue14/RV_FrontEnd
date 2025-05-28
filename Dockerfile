# Etapa de build (glibc)
FROM node:20 AS build
WORKDIR /app

# Copiamos package*.json explícito (asegúrate de que package-lock.json existe en tu carpeta)
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm install

# Copiamos tu código
COPY . .

# Desactiva el modo service de esbuild y build de Vite
ENV ESBUILD_DISABLE_SERVICE=true
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
