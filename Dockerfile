# Use a imagem base do Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a sua configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos do seu projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta que o Nginx usará
EXPOSE 8585

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
