pipeline {
  agent any
  environment {
    DOCKER_COMPOSE_VERSION = '1.29.2'
  }
  stages {
    stage('Install Dependencies') {
        agent {
            docker {
                image 'node:16-alpine'
            }
        }
        steps {
                dir('server') {
                sh 'npm install'
                }
        }
    }
    stage('Run Jest Tests') {
        agent {
            docker {
                image 'node:16-alpine'
            }
        }
        steps {
            sh 'cd server && npm run test'
        }
    }
    stage('Run integration Tests') {
        agent {
            docker {
                image 'node:16-alpine'
            }
        }
        steps {
            sh 'cd server && npm run test:integration'
        }
    }
    stage('coverage') {
        agent {
            docker {
                image 'node:16-alpine'
            }
        }
        steps {
            sh 'cd server && npm run coverage'
        }
    }
    stage('Build Docker Images') {
      steps {
        script {
          docker.build('server', "./server")
        }
      }
    }
    stage('Run Docker Containers with Docker Compose') {
      steps {
        sh 'curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o docker-compose'
        sh 'chmod +x docker-compose'
        sh './docker-compose up -d'
      }
    }
    stage('Stop Docker Containers with Docker Compose') {
      steps {
        sh './docker-compose down'
      }
    }
  }
  post {
    always {
      sh 'docker images -q | xargs docker rmi -f || true'
    }
  }
}