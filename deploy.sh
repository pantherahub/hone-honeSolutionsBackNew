#!/bin/bash

# Detener el script si ocurre algún error
set -e

# Ruta a la aplicación Angular
APP_DIR=$(pwd)

# Usar nvm para seleccionar la versión de Node.js
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 18

# Cambiar al directorio de la aplicación
cd "$APP_DIR"

# Instalar dependencias
echo "Instalando dependencias..."
npm install

sudo pm2 restart prestadores-back
sudo pm2 logs

echo "Completo!"









