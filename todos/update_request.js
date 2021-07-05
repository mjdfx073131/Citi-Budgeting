"use strict";
const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB.DocumentClient();
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
  const request_amount = parseInt(slots.request_amount,10);
  const request_reason = slots.request_reason;
  const params = {
    TableName: "budget-14-dev",
    Key: {
      project_id: project_id,
      request_id: request_id,
    },
    ExpressionAttributeValues: {
      //':initial_budget': data.initial_budget,
      ":request_amount": request_amount,
      //':net_amt_remaining': data.initial_budget - data.most_recent_request_amt,
      //':project_id' : data.project_id,
      //':project_type' : data.project_type,
      //':start_date' : data.start_date,
      //':team' : data.team,
      ":request_reason": request_reason,
    },
    //UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    UpdateExpression:
      "SET request_reason = :request_reason, request_amount = :request_amount, net_amount_remaining = net_amount_remaining - :request_amount",
    ReturnValues: "ALL_NEW",
  };
  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
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
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
      callback(
        close(sessionAttributes, "Fulfilled", {
          contentType: "PlainText",
          content:
            `Here are the details of your request:\r\n` +
            "Request ID: " +
            result.Attributes["request_id"] +
            "\r\n" +
            "Project ID: " +
            result.Attributes["project_id"] +
            "\r\n" +
            "Start Date: " +
            result.Attributes["start_date"] +
            "\r\n" +
            "End Date: " +
            result.Attributes["end_date"] +
            "\r\n" +
            "Initial Budget: " +
            result.Attributes["initial_budget"] +
            "\n" +
            "Request Amount: " +
            result.Attributes["request_amount"] +
            "\n" +
            "Net Amount Remaining: " +
            result.Attributes["net_amount_remaining"] +
            "\n" +
            "Team: " +
            result.Attributes["team"] +
            "\n" +
            "Team Manager: " +
            result.Attributes["team_manager"] +
            "\n",
        })
      );
  });
  // callback(
  //   close(sessionAttributes, "Fulfilled", {
  //     contentType: "PlainText",
  //     content: `Okay, request ${request_id} updated for project ${project_id}. The request amount has been changed to ${request_amount}. Your request_id is ${request_id}.`,
  //   })
  // );
}
// --------------- Main handler -----------------------
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
module.exports.updateR = (event, context, callback) => {
  try {
    dispatch(event, (response) => {
        callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
};
