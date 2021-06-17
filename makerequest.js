'use strict';

const aws = require('aws-sdk');
const dynamoDb = new aws.DynamoDB.DocumentClient();
var lambda = new aws.Lambda({
   region: 'us-east-1' 
});

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const project_id = slots.project_id;
    const request_reason = slots.request_reason;
    const request_amount = slots.request_amount;
    const team = slots.team;
    const team_manager = slots.team_manager;
    const start_date = slots.start_date;
    const end_date = slots.end_date;
    const request_id = Math.floor(Math.random() * 100)
    const initial_budget = 2000

    

    const params = {
    TableName: "budget-14-prd",
    Item: {
        project_id: project_id,
        request_id: request_id,
        request_reason: request_reason,
        request_amount: request_amount,
        team: team,
        team_manager: team_manager,
        start_date: start_date,
        end_date: end_date,
        initial_budget: initial_budget
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

    callback(close(sessionAttributes, 'Fulfilled',
    {'contentType': 'PlainText', 'content': `Okay, request made for project ${project_id} in the amount of ${request_amount}. Your request_id is ${request_id}. Please retain this number for future use.`}));

}
 
// --------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        dispatch(event, 
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};