pipeline {
    agent any
    stages {
        stage("unittest") {
            steps {
                echo "unit testing..."
                sh("ls .")
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