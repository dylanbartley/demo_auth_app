pipeline {
    agent any
    stages {
        stage("unittest") {
            steps {
                ls .
                echo "unit testing..."
                npm test
            }
        }
        stage("build") {
            steps {
                echo "building..."
            }
        }
    }
}