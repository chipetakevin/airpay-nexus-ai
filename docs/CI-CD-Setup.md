# CI/CD Pipeline Setup Guide

This guide explains how to set up automated code consistency checks in popular CI/CD platforms.

## Package.json Scripts (Local Development)

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint src --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "type-check": "tsc --noEmit",
    "quality-check": "node scripts/code-quality.js",
    "pre-commit": "npm run lint && npm run format:check && npm run type-check && npm run quality-check"
  }
}
```

## GitHub Actions

Create `.github/workflows/code-quality.yml`:

```yaml
name: Code Quality Checks

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run ESLint
      run: npm run lint
    
    - name: Check Prettier formatting
      run: npm run format:check
    
    - name: TypeScript type check
      run: npm run type-check
    
    - name: Run custom quality checks
      run: npm run quality-check
    
    - name: Build project
      run: npm run build
```

## GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - quality
  - build

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

before_script:
  - npm ci

lint:
  stage: test
  script:
    - npm run lint
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"

format-check:
  stage: test
  script:
    - npm run format:check
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"

type-check:
  stage: test
  script:
    - npm run type-check
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"

quality-check:
  stage: quality
  script:
    - npm run quality-check
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

## Jenkins Pipeline

Create `Jenkinsfile`:

```groovy
pipeline {
    agent any
    
    tools {
        nodejs '18'
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Code Quality Checks') {
            parallel {
                stage('ESLint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                
                stage('Prettier Check') {
                    steps {
                        sh 'npm run format:check'
                    }
                }
                
                stage('TypeScript') {
                    steps {
                        sh 'npm run type-check'
                    }
                }
                
                stage('Custom Quality Check') {
                    steps {
                        sh 'npm run quality-check'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
            
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build failed. Check Jenkins for details: ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

## CircleCI

Create `.circleci/config.yml`:

```yaml
version: 2.1

jobs:
  code-quality:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
            - v1-dependencies-
      - run: npm ci
      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package-lock.json" }}
      - run:
          name: Run ESLint
          command: npm run lint
      - run:
          name: Check Prettier formatting
          command: npm run format:check
      - run:
          name: TypeScript type check
          command: npm run type-check
      - run:
          name: Custom quality checks
          command: npm run quality-check
      - run:
          name: Build
          command: npm run build

workflows:
  version: 2
  test-and-build:
    jobs:
      - code-quality
```

## SonarQube Integration

Create `sonar-project.properties`:

```properties
sonar.projectKey=addex-hub-nerve-center
sonar.projectName=Addex Hub Nerve Center
sonar.projectVersion=1.0
sonar.sources=src
sonar.exclusions=**/*.test.ts,**/*.test.tsx,**/node_modules/**
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

Add to your CI pipeline:

```bash
# Install SonarQube Scanner
npm install -g sonarqube-scanner

# Run analysis
sonar-scanner \
  -Dsonar.projectKey=addex-hub-nerve-center \
  -Dsonar.sources=src \
  -Dsonar.host.url=$SONAR_HOST_URL \
  -Dsonar.login=$SONAR_TOKEN
```

## Pre-commit Hooks

Install husky for git hooks:

```bash
npm install --save-dev husky lint-staged
npx husky install
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,md,json}": [
      "prettier --write"
    ]
  }
}
```

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run type-check
npm run quality-check
```

## Quality Gates

Set up quality gates that must pass before merging:

### ESLint Rules
- No errors allowed
- Warnings should be addressed
- Maximum complexity: 10
- No unused variables
- Consistent import ordering

### Prettier Rules
- All files must be formatted consistently
- Line length: 100 characters
- 2 spaces for indentation
- Single quotes for strings

### TypeScript Rules
- Strict mode enabled
- No implicit any
- All imports must be typed
- No unused imports

### Custom Quality Rules
- Component files must use PascalCase
- Hook files must start with 'use'
- No direct color usage (use design tokens)
- Proper export patterns
- Consistent file naming

## Monitoring and Reporting

Set up notifications for:
- Failed quality checks
- Code coverage drops
- New security vulnerabilities
- Performance regressions

Use tools like:
- GitHub/GitLab notifications
- Slack integrations
- Email alerts
- Dashboard monitoring

## Best Practices

1. **Fail Fast**: Run quick checks (linting, formatting) first
2. **Parallel Execution**: Run independent checks in parallel
3. **Cache Dependencies**: Cache node_modules between runs
4. **Quality Gates**: Don't allow merges if quality checks fail
5. **Regular Updates**: Keep tools and rules updated
6. **Team Training**: Ensure team understands quality standards
7. **Gradual Adoption**: Introduce new rules gradually
8. **Documentation**: Keep quality standards documented and accessible