pipeline {
    agent {
        // Create a temporary docker agent to run docker commands from
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
              volumes:
              - name: docker-sock
                hostPath:
                  path: /var/run/docker.sock
              - name: kubectl
                image: bitnami/kubectl:latest
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
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    script {
                        echo 'Deploying to Kubernetes...'
                        sh 'kubectl apply -f k8s-deployment.yaml'
                    }
                }
            }
        }
    }
}
