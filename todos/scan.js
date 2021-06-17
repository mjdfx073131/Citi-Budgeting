'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.scan = (event, context, callback) => {

    const teamName = event.pathParameters.team;
    const net_amount_remaining = parseInt(event.pathParameters.net_amount_remaining, 10);

    let params = {
        TableName: "budget-14-dev",
        FilterExpression: "team = :team and net_amount_remaining < :net_amount_remaining",
        ExpressionAttributeValues: {
            ":team": teamName,
            ":net_amount_remaining": net_amount_remaining,
        }
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }

        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
          body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });

};
