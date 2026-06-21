# Dockerfile para Frontend React + Vite en Railway
# Usa Node.js 20 Alpine (imagen ligera)
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Build de producción de Vite
RUN npm run build

# ====================================
# Etapa de producción con nginx
# ====================================
FROM nginx:alpine

# Copiar archivos de build desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto (Railway lo asignará dinámicamente)
EXPOSE 8080

# Nginx se ejecuta automáticamente
CMD ["nginx", "-g", "daemon off;"]
