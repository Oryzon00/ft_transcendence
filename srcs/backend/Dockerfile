FROM		node:16

EXPOSE	3000

WORKDIR		/script
COPY		initBack.sh	/script
RUN			chmod 777 initBack.sh

WORKDIR		/api


RUN npm install -g npm
RUN npm cache clean --force
RUN npm install path-type

ENTRYPOINT	["/bin/bash", "/script/initBack.sh"]
