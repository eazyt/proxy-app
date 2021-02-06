# Ubuntu 18.04

Install VirtualBox:
sudo apt-get install -y virtualbox

# Install kubectl

version=1.5.1
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.5.1/bin/linux/amd64/kubectl

latest
KUBE_VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/${KUBE_VERSION}/bin/linux/amd64/kubectl \
  && chmod +x kubectl \
  && sudo mv -f kubectl /usr/local/bin/ \
  && kubectl version

# Install Minikube

version=1.9.2
curl -LO https://storage.googleapis.com/minikube/releases/v1.9.2/minikube-linux-amd64

version=1.11.0
curl -LO https://storage.googleapis.com/minikube/releases/v1.11.0/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# start minikube

minikube start --vm-driver=virtualbox

kubectl get pods --all-namespaces
kubectl config view
minikube addons list
