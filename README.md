# Proyecto Sistema de Programas

## Instalación de Dependencias
es necesario tener instalado [Node.js](https://nodejs.org) para poder instalar las dependencias del proyecto.

Ya teniendo instalado Node.js, se debe correr el siguiente comando en la terminal para instalar las dependencias del proyecto:
```ps1
npm install
```
## Instalación de Dependencias de Python
En caso de que al momento de ejecutar 'npm install', al instalar las dependencias de python ocurre algún error, se debe correr el siguiente comando en la terminal:
```ps1
pip install -r requirements.txt
```
## Correr el Proyecto
Para correr el proyecto se debe correr el siguiente comando en la terminal:
```ps1
npm run dev
```
#Creacion de variables de entorno
Crear un archivo .env en la raiz del proyecto que contenga lo siguiente:
```ps1
DATABASE_URL = 'mysql://user:password@host/database_name'
```