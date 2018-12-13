import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      orderId: data.orderId,
      userId: event.requestContext.identity.cognitoIdentityId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      shippingAddressStreet: data.shippingAddressStreet,
      shippingAddressCity: data.shippingAddressCity,
      shippingAddressState: data.shippingAddressState,
      shippingAddressZip: data.shippingAddressZip,
      impression: data.impression,
      product: data.product,      
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
