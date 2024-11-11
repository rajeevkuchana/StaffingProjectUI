FROM node:alpine


WORKDIR /opt

COPY ./ ./

#ENV DANGEROUSLY_DISABLE_HOST_CHECK=true


EXPOSE 3000

RUN npm i

CMD HOST=0.0.0.0  npm start &&  tail -f /dev/null
