pipeline {
    agent any
    stages {
        stage("unittest") {
            steps {
                echo "unit testing..."
                sh ". ~/.nvm/nvm.sh && nvm use 20"
                sh "npm test"
            }
        }
        stage("build") {
            steps {
                echo "building..."
            }
        }
    }
}