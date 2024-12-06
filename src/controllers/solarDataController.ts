import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall as awsUnmarshall } from '@aws-sdk/util-dynamodb';
import dotenv from 'dotenv';
import { SolarData } from "../models/solarData";
dotenv.config();
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);
export const addSolarData = async (solarData: SolarData) => {
    if (!process.env.DYNAMODB_TABLE_NAME) {
      throw new Error('DYNAMODB_TABLE_NAME is not defined in the .env file');
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Item: {
        panel_id: solarData.panel_id,
        timestamp: solarData.timestamp,
        metrics: solarData.metrics,
      },
    };

    console.log('DynamoDB params:', params);

    try {
      await docClient.send(new PutCommand(params));
      return { message: 'Data added successfully', data: solarData };
    } catch (error) {
      throw new Error('Error adding solar data: ' + error);
    }
  };
  export const getSolarData = async (panel_id: string) => {
    if (!process.env.DYNAMODB_TABLE_NAME) {
      throw new Error('DYNAMODB_TABLE_NAME is not defined in the .env file');
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        panel_id: { S: panel_id }, // Use the partition key to retrieve the item
      },
    };

    try {
      const { Item } = await docClient.send(new GetItemCommand(params));

      if (!Item) {
        throw new Error('Data not found for the given panel_id');
      }

      // Convert the DynamoDB item to a normal object
      const solarData = awsUnmarshall(Item);

      return solarData;
    } catch (error) {
      throw new Error(`Error retrieving solar data: ${error}`);
    }
  };
