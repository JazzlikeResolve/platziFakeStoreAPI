pipeline {
    agent any

    tools {
        nodejs "NodeJS_18" // configure NodeJS in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JazzlikeResolve/platziFakeStoreAPI.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
