'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: "budget-14-dev",
    Item: {
      project_id: data.project_id,
      request_id: data.request_id,
      team: data.team,
      team_manager: data.team_manager,
      request_reason: data.request_reason,
      start_date: data.start_date,
      end_date: data.end_date,
      initial_budget: data.initial_budget,
      net_amount_remaining: data.net_amount_remaining,
      most_recent_request_amt: data.most_recent_request_amt
    },
  };

  // write the entry to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the entry.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
