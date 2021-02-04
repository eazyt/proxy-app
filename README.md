
# this repo will deploy 2 pods(nginx as proxy and nodeapp as backend)

# usage on local machine with kubectl and minikube installed

clone this repo and run:
kubectl create -f webapp-deployment.yaml

# Enable the Ingress controller
minikube addons enable ingress

# assigning LoadBalancer to minikube deployment

minikube service webapp-service

# verify IP address

kubectl get ingress

# Add the following line to the bottom of the /etc/hosts file (IP address from kubectl get ingress)

192.168.48.16 demo.homelab.local

# Verify that the Ingress controller is directing traffic

curl demo.homelab.local

# on the local machine browser visit

demo.homelab.local

# terminate webapp deployments, ingress and service

kubectl delete deploy webapp
kubectl delete svc webapp-service
kubectl delete ingress webapp-ingress

# tearing it down minikube

Stopping a Cluster Minikube
minikube stop

########################################################################################
video link: 
