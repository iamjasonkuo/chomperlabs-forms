import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      orderId: uuid.v1(), //or use the ordernumber that shipstation generates
      userId: event.requestContext.identity.cognitoIdentityId,
      // noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      // LIST OUT ALL THE INFORMATION THAT IS BEING RECEIVED FROM THE CLIENT
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
