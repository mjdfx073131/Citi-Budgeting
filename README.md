[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=mjdfx073131_Citi-Budgeting&metric=bugs)](https://sonarcloud.io/dashboard?id=mjdfx073131_Citi-Budgeting) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=mjdfx073131_Citi-Budgeting&metric=code_smells)](https://sonarcloud.io/dashboard?id=mjdfx073131_Citi-Budgeting) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=mjdfx073131_Citi-Budgeting&metric=security_rating)](https://sonarcloud.io/dashboard?id=mjdfx073131_Citi-Budgeting) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=mjdfx073131_Citi-Budgeting&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=mjdfx073131_Citi-Budgeting) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mjdfx073131_Citi-Budgeting&metric=alert_status)](https://sonarcloud.io/dashboard?id=mjdfx073131_Citi-Budgeting)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) 


```
__________                   .___              __   
\______   \_______  ____   __| _/ ____   _____/  |_ 
 |     ___/\_  __ \/  _ \ / __ | / ___\_/ __ \   __\
 |    |     |  | \(  <_> ) /_/ |/ /_/  >  ___/|  |  
 |____|     |__|   \____/\____ |\___  / \___  >__|  
                              \/_____/      \/      
```
# Citi-Budgeting
It is essential for teams within Citi to have a budget planned for each project so that Citi can control their finances and make sure everything runs smoothly


# Front-End
- React and Heroku 
- [Repo](https://github.com/LinlinlinlinW/Citi-Budgeting-FE)

# Back-End
- AWS Lambda
- API Gateway
- DynamoDB
- Amazon Lex

## Part 1
- FE -> API Gateway -> Lambda -> DynamoDB
![part1](assets/Screen%20Shot%202021-07-04%20at%2020.48.18.png)

## Part 2
- Initially, trigger lambda directly from `Amazon Lex` 
- Update: trigger lambda using `Axios` to call `API Gateway`
![part2](assets/Screen%20Shot%202021-07-04%20at%2020.48.29.png)

### Chatbot Demo
- Used `Aws Cognito` to do authentication and deployed Lex to `AWS S3`
![Chatbot](assets/Screen%20Shot%202021-06-18%20at%2010.07.17.png)

# Google Doc
[Link](https://docs.google.com/document/d/1UK8MGqmnJMEkaY8PDYpBi0ci2oQbAtCAKsIcuOUUsig/edit?ts=60ca2208)
