'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  /** 
  if (typeof data.end_date !== 'string' 
  || typeof data.initial_budget !== 'number' 
  || typeof data.most_recent_request_amt !== 'number'
  || typeof data.net_amt_remaining !== 'number'
  || typeof data.Project_id !== 'number'
  || typeof data.project_type !== 'string'
  || typeof data.start_date !== 'string'
  || typeof data.team !== 'string'
  || typeof data.team_manager !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the todo item.',
    });
    return;
  }
  */

  const params = {
    TableName: "budget-14-dev",
    Key: {
      Project_id: event.pathParameters.Project_id,
    },
    ExpressionAttributeValues: {
      ':end_date': data.end_date,
      //':initial_budget': data.initial_budget,
      ':most_recent_request_amt': data.most_recent_request_amt,
      //':net_amt_remaining': data.initial_budget - data.most_recent_request_amt,
      //':project_id' : data.Project_id,
      //':project_type' : data.project_type,
      //':start_date' : data.start_date,
      //':team' : data.team,
      ':team_manager' : data.team_manager,
    },
    //UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    UpdateExpression: 'SET end_date = :end_date, most_recent_request_amt = :most_recent_request_amt, team_manager = :team_manager',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
