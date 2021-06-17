"use strict";
const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();
var response = "";
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
  const slots = intentRequest.currentIntent.slots;
  const project_id = slots.project_id;
  const request_id = slots.request_id;
  const params = {
    TableName: "budget-14-dev",
    Key: {
      project_id: project_id,
      request_id: request_id,
    },
  };
  // delete the project entry from the database
  dynamoDb.get(params, (error, result) => {
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
    // create a response
    response = {
      statusCode: 200,
      body: result.Item,
    };
    callback(null, response);
  });
  callback(
    close(sessionAttributes, "Fulfilled", {
      contentType: "PlainText",
      content:
        `Here are the details of your request:\r\n` +
        "Request ID: " +
        response.body["request_id"] +
        "\r\n" +
        "Project ID: " +
        response.body["project_id"] +
        "\r\n" +
        "Start Date: " +
        response.body["start_date"] +
        "\r\n" +
        "End Date: " +
        response.body["end_date"] +
        "\r\n" +
        "Initial Budget: " +
        response.body["initial_budget"] +
        "\n" +
        "Request Amount: " +
        response.body["request_amount"] +
        "\n" +
        "Net Amount Remaining: " +
        response.body["net_amount_remaining"] +
        "\n" +
        "Team: " +
        response.body["team"] +
        "\n" +
        "Team Manager: " +
        response.body["team_manager"] +
        "\n",
    })
  );
}
// --------------- Main handler -----------------------
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
module.exports.getOneR = (event, context, callback) => {
  try {
    dispatch(event, (response) => {
      callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
};
