'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: "budget-14-dev",
    Item: {
      Project_id: data.Project_id,
      team: data.team,
      team_manager: data.team_manager,
      project_type: data.project_type,
      start_date: data.start_date,
      end_date: data.end_date,
      initial_budget: data.initial_budget,
      net_amount_remaining: data.net_amount_remaining
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
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
