const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const sortLeaderBoardByDescendingPrice = (position1, position2) => {

    const priceA = position1.totalCost;
    const priceB = position2.totalCost;

    return priceB - priceA;
}

exports.handler = async event => {
  const params = {
    TableName: "AwardItLeaderboard" 
  };
  try {
    // Utilising the scan method to get all items in the table
    const data = await documentClient.scan(params).promise();
  
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};
