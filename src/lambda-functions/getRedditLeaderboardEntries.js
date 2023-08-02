// Import necessary AWS SDK modules
const AWS = require("aws-sdk");

// Initialize AWS SDK (Ensure you have appropriate IAM roles set up)
const dynamoDB = new AWS.DynamoDB();

// Lambda function handler
exports.handler = async (event, context) => {
  try {
    // Parse request parameters from the event
    const { pageNumber, pageSize } = event;

    // Calculate the starting index for pagination
    const startIndex = (pageNumber - 1) * pageSize;

    // DynamoDB query to fetch paginated items
    const params = {
      TableName: "AwardItLeaderboard", // Replace 'items' with your DynamoDB table name
      Limit: pageSize,
      ExclusiveStartKey:
        startIndex > 0 ? { id: startIndex.toString() } : undefined,
    };

    // Execute the DynamoDB query
    const result = await dynamoDB.scan(params).promise();

    // Return the paginated data as the response
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error occurred while processing the request.",
      }),
    };
  }
};
