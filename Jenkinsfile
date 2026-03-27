pipeline {
    agent any

    // This replaces the .env file that we removed from GitHub
    environment {
        API_URL = 'https://api.escuelajs.co'
        API_EMAIL = 'john@mail.com'
        API_PASSWORD = 'changeme'
    }

    tools {
        nodejs "NodeJS_18" 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JazzlikeResolve/platziFakeStoreAPI.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                // Tip: Install only the browser you need to save time
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // We use catchError so the pipeline continues to 'post' even on failure
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx playwright test --reporter=html'
                }
            }
        }
    }

    post {
        always {
            // This is the "Magic" part: It runs even if tests fail
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}