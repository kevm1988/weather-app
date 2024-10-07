pipeline {
    agent {
        kubernetes {
            label 'docker-kubectl-agent'
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: docker
                image: docker:19.03.12
                command:
                - cat
                tty: true
                volumeMounts:
                - name: docker-sock
                  mountPath: /var/run/docker.sock
              - name: kubectl
                image: bitnami/kubectl:1.20.0
                command:
                - cat
                tty: true
              volumes:
              - name: docker-sock
                hostPath:
                  path: /var/run/docker.sock
            """
        }
    }
    environment {
        DOCKER_IMAGE = "kevinmeikle88/weather-app"
    }
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kevm1988/weather-app.git'
            }
        }
        stage('Build Docker image') {
            steps {
                container('docker') {
                    script {
                        dockerImage = docker.build(DOCKER_IMAGE)
                    }
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // You can add test scripts here
            }
        }
        stage('Push to Docker Hub') {
            steps {
                container('docker') {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                            dockerImage.push()
                        }
                    }
                }
            }
        }
The error message you're seeing (curl: not found) indicates that the docker:19.03.12 container image you're using doesn't have curl installed by default. To fix this, you'll need to install curl before attempting to download and install kubectl.

Here’s how you can modify your pipeline to first install curl and then proceed with installing kubectl:
Modified Pipeline to Install curl and kubectl:

groovy

The error message you're seeing (curl: not found) indicates that the docker:19.03.12 container image you're using doesn't have curl installed by default. To fix this, you'll need to install curl before attempting to download and install kubectl.

Here’s how you can modify your pipeline to first install curl and then proceed with installing kubectl:
Modified Pipeline to Install curl and kubectl:

groovy

            stage('Deploy to Kubernetes') {
                steps {
                    container('docker') {
                        script {
                            echo 'Installing curl and kubectl...'
                            sh '''
                            # Install curl
                            apk update && apk add curl

                            # Install kubectl
                            curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                            chmod +x kubectl
                            mv kubectl /usr/local/bin/kubectl

                            # Verify kubectl installation
                            kubectl version --client

                            # Deploy to Kubernetes
                            kubectl apply -f k8s-deployment.yaml
                            '''
                        }
                    }
                }
            }
        }
}
