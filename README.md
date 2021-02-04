
# usage on local machine with kubectl and minikube installed

clone this repo and run
kubectl apply -f webapp-deployment.yaml

# steps i followed to accomplish this demo

Install VirtualBox:
sudo apt-get install -y virtualbox

# Install kubectl

KUBE_VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/${KUBE_VERSION}/bin/linux/amd64/kubectl \
  && chmod +x kubectl \
  && sudo mv -f kubectl /usr/local/bin/ \
  && kubectl version

# Install Minikube

curl -LO https://storage.googleapis.com/minikube/releases/v1.11.0/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# start minikube

minikube start --vm-driver=virtualbox

# enable ingress on minikube

minikube addons enable ingress
kubectl get pods -n kube-system

## webapp Deployments - this will be deployed with webapp-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
 name: webapp-deployment
 labels:
   role: webapp
spec:
 replicas: 1
 selector:
   matchLabels:
     role: webapp
 template:
   metadata:
     labels:
       role: webapp
   spec:
     containers:
     - name: app
       image: "eazyt/my-webapp:v2"
     - name: web
       image: "eazyt/nginxsidecar:v2"

# create service(local access via NodePort) - this will be deployed with webapp-deployment.yaml

apiVersion: v1
kind: Service
metadata:
 name: webapp-service
spec:
 selector:
   role: webapp
 ports:
   - protocol: TCP
     port: 80
     targetPort: 80
     nodePort: 32000
 type: NodePort

# Create an Ingress resource - this will be deployed with webapp-deployment.yaml

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
    - host: demo.homelab.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: webapp-service
                port:
                  number: 80

# assigning LoadBalancer to minikube deployment

minikube service NAME-OF-SERVICE
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
kubectl delete svc webapp-svc

# tearing it down minikube

Stopping a Cluster Minikube
minikube stop

########################################################################################

