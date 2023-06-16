FROM		node:16

EXPOSE	3000

WORKDIR		/script
COPY		initBack.sh	/script
RUN			chmod 777 initBack.sh

WORKDIR		/api

ENTRYPOINT	["/bin/bash", "/script/initBack.sh"]
