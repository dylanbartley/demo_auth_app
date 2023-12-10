pipeline {
    agent any
    stages {
        stage("unittest") {
            steps {
                sh('whoami')
                echo "unit testing..."
                sh("npm test")
            }
        }
        stage("build") {
            steps {
                echo "building..."
            }
        }
    }
}