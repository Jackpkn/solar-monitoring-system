import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
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
        "solar-monitoring": { S: solarData.id },
        timestamp: { S: solarData.timestamp },
        energyProduced: { S: solarData.energyProduced },
      },
    };

    console.log('DynamoDB params:', params);

    try {
      await docClient.send(new PutItemCommand(params));
      return { message: 'Data added successfully', data: solarData };
    } catch (error) {
      throw new Error('Error adding solar data: ' + error);
    }
  };
export const getSolarData = async (id: string) => {
    if (!process.env.DYNAMODB_TABLE_NAME) {
      console.error('DYNAMODB_TABLE_NAME is missing in the environment variables');
      return;
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        id: { S: id },
      },
    };

    try {
      console.log('Fetching data for ID:', id);
      const { Item } = await docClient.send(new GetItemCommand(params));

      if (!Item) {
        console.error(`No data found for ID: ${id}`);
        return;
      }

      const solarData = awsUnmarshall(Item);
      console.log('Data retrieved:', solarData);

      return solarData;
    } catch (error) {
      console.error(`Error retrieving solar data for ID ${id}: ${error}`);
    }
  };
