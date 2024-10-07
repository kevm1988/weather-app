pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "kevinmeikle1988/weather-app"
    }
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/kevm1988/weather-app.git'
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build(DOCKER_IMAGE)
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
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                // Add your kubectl commands here for deployment
                sh 'kubectl apply -f k8s-deployment.yaml'
            }
        }
    }
}
