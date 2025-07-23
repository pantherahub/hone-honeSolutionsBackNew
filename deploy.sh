#!/bin/bash

# Detener el script si ocurre algún error
set -e

# Ruta a la aplicación Angular
APP_DIR=$(pwd)
ENVIRONMENT=${1:-"prod"}

# Usar nvm para seleccionar la versión de Node.js
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 18

# Cambiar al directorio de la aplicación
cd "$APP_DIR"

# Instalar dependencias
echo "Instalando dependencias..."
sudo npm install

# Eliminar proceso en PM2
echo "Eliminando el proceso.."
sudo pm2 delete prestadores-back || true

if [ -d "dist" ]; then
echo "Eliminando dist..."
  sudo rm -rf dist
fi

# Compilar la aplicación
echo "Compilando la aplicación..."
sudo npm run build

# Iniciar el proceso pm2
echo "Iniciando el proceso.."
if [ "$ENVIRONMENT" = "prod" ]; then
	sudo pm2 start ecosystem.config.js --env production
else
	sudo pm2 start ecosystem.config.js --env development
fi

echo "Completo!"
sudo pm2 log prestadores-back










