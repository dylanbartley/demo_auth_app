pipeline {
    agent any
    stages {
        stage("unittest") {
            steps {
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