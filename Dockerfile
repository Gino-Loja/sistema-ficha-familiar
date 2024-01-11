# FROM node:latest

# WORKDIR /app
#  COPY package.json ./


# COPY . .

# RUN npm install -- production 
# RUN npm run build

# CMD [ "npm", "start" ]


FROM bitnami/minideb

# Instala Node.js y npm
RUN install_packages curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN install_packages nodejs

# Crea el directorio de la aplicación
RUN mkdir -p /app

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . /app

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]

