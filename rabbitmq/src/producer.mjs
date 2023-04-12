import client from 'amqplib'

async function main() {
  const connection = await client.connect(
    'amqp://guest:guest@localhost:5672'
  )

  // Create a channel
  const channel = await connection.createChannel()

  // Makes the queue available to the client
  await channel.assertQueue('myQueue')

  //Send a message to the queue
  channel.sendToQueue('myQueue', Buffer.from('message'))

}

main();
