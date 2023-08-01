const AWS = require("aws-sdk");
const crypto = require("crypto");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const requestBody = event.body ? JSON.parse(event.body) : event;
  const { id, coins, totalCost, permalink, subReddit, title } = requestBody;

  const params = {
    TableName: "AwardItLeaderboard",
    Item: {
      id,
      coins,
      totalCost,
      permalink,
      subReddit,
      title,
    },
  };
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
    };
    return response; // Returning a 200 if the item has been inserted
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
