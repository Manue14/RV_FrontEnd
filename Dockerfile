# Etapa de build (glibc)
FROM node:20 AS build
WORKDIR /app

# 1. Copiamos sólo package.json
COPY package.json ./

# 2. Instalamos deps sin las optionalDependencies
RUN npm install --omit=optional

# 3. Forzamos la instalación del binario nativo que Rollup espera
RUN npm install @rollup/rollup-linux-x64-gnu --no-save

# 4. Copiamos el resto del código (incluye tus imports de Firebase)
COPY . .

# 5. Desactiva el modo service de esbuild
ENV ESBUILD_DISABLE_SERVICE=true

# 6. Genera el build de Vite
RUN npm run build


EXPOSE 5173
CMD ["npm", "run", "dev"]
