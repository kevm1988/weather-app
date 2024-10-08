pipeline {
    agent {
        kubernetes {
            label 'k8s-agent'  // Replace with the label of your Kubernetes pod template
            defaultContainer 'jnlp'  // The container running the Jenkins agent (usually 'jnlp')
        }
    }
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kevm1988/weather-app.git'
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build('kevinmeikle88/weather-app')
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
                sh 'kubectl apply -f k8s-deployment.yaml'
            }
        }
    }
}
