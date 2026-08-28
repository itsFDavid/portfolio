FROM nginx:alpine

LABEL maintainer="Francisco David <fdavid04@icloud.com>"

RUN rm -rf /usr/share/nginx/html/*

COPY dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
