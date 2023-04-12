// Based on https://github.com/aertje/cloud-tasks-emulator#javascript-example

import { CloudTasksClient } from '@google-cloud/tasks';
import { credentials } from '@grpc/grpc-js';

const url = 'https://f09e-2605-59c8-3091-d710-2dca-a845-3b04-f811.ngrok-free.app/api/v1/process'

const client = new CloudTasksClient({
  port: 8123,
  servicePath: 'localhost',
  sslCreds: credentials.createInsecure(),
});

const serviceAccountEmail = "PROJECT_ID@appspot.gserviceaccount.com";
const parent = 'projects/my-sandbox/locations/us-central1';
const queueName = `${parent}/queues/test`;

const payload = {
  foo: "bar",
  key: "value"
};

const queue = await client.getQueue({ name: queueName })
if (!queue) {
  await client.createQueue({ parent, queue: { name: queueName } });
}

await client.createTask({
  parent: queueName,
  task: {
    httpRequest: {
      httpMethod: 'POST',
      url,
      body: Buffer.from(JSON.stringify(payload)).toString("base64"),
      headers: {
        "Content-Type": "application/json"
      },
      oidcToken: {
        serviceAccountEmail
      }
    }
  },
});
