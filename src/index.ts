import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'us-east-1',
  });

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const bucketName = "adorableanimals";
  
  try {
    const params = {
      Bucket: bucketName,
      MaxKeys: 50
    };
    
    const data = await s3.listObjectsV2(params).promise();
    const randomIndex = Math.floor(Math.random() * data.Contents.length);
    const randomObject = data.Contents[randomIndex];
    const imageUrl = `https://${bucketName}.s3.amazonaws.com/${randomObject.Key}`;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};