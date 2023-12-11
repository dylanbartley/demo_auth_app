pipeline {
    agent any
    stages {
        stage("pre-build") {
            steps {
                echo "pre building..."
                sh """
                    . ~/.nvm/nvm.sh"
                    nvm use 20
                    npm install
                """
            }
        }
        stage("unittest") {
            steps {
                echo "unit testing..."
                sh ". ~/.nvm/nvm.sh && npm test"
            }
        }
        stage("build") {
            steps {
                echo "building..."
            }
        }
    }
}