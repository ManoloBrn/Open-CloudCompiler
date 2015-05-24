#!/bin/sh

#Install Docker
#sudo which wget
#sudo apt-get update $ sudo apt-get install wget
#wget -qO- https://get.docker.com/ | sh

#echo "Docker Setup complete"

#install NodeJs
#sudo apt-get update
#sudo apt-get install nodejs
#sudo apt-get install npm
#echo "NodeJS setup Complete"

###########################
# Start Docker 
###########################
sudo chmod 777 ../API/DockerTimeout.sh
sudo chmod 777 ../API/Payload/script.sh
sudo chmod 777 ../API/Payload/javaRunner.sh
sudo chmod 777 UpdateDocker.sh

sudo service docker restart
sudo ./UpdateDocker.sh 
