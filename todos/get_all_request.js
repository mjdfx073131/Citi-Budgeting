"use strict";
const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();
var lambda = new aws.Lambda({
  region: "us-east-1",
});
// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: "Close",
      fulfillmentState,
      message,
    },
  };
}
// --------------- Events -----------------------
function dispatch(intentRequest, callback) {
  console.log(
    `request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`
  );
  const sessionAttributes = intentRequest.sessionAttributes;
  const params = {
    TableName: "budget-14-dev",
    Key: {
      project_id: project_id,
      request_id: request_id,
    },
  };
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the table.",
      });
      return;
    }
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
  callback(
    close(sessionAttributes, "Fulfilled", {
      contentType: "PlainText",
      content: `Okay, request made for project ${project_id} in the amount of ${request_amount}. Your request_id is ${request_id}. Please retain this number for future use.`,
    })
  );
}
// --------------- Main handler -----------------------
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
module.exports.getAllR = (event, context, callback) => {
  try {
    dispatch(event, (response) => {
      callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
};
