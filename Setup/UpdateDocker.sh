
echo "Creating Docker Image"
sudo docker build -t 'virtual_machine' - < Dockerfile
echo "Retrieving Installed Docker Images"
sudo docker images
