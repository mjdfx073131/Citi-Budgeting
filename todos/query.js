"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.query = (event, context, callback) => {
  var teamName = event.pathParameters.team;

  const params = {
    TableName: "budget-14-dev",
    ProjectionExpression: "#t, net_amount_remaining",
    FilterExpression: "#t = :tn",
    ExpressionAttributeNames: {
      "#t": "team",
    },
    ExpressionAttributeValues: {
      ":tn": teamName,
    },
  };

  // query database with params
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todo item.",
      });
      return;
    }
    const totalSum = result.Items.reduce(function (sum, item) {
      return sum + item.net_amount_remaining;
    }, 0);
    console.log("totalSum:" + totalSum)
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
