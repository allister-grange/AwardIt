const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

async function getFirst10ItemsFromDB() {
  const tableName = "AwardItLeaderboard";

  const params = {
    TableName: tableName,
    Limit: 10,
  };

  try {
    const data = await documentClient.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

// Call the function to retrieve the first 10 items
getFirst10ItemsFromDB()
  .then((first10Items) => {
    console.log(first10Items);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
