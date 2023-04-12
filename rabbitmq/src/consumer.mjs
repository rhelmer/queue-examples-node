import client from 'amqplib'

const url = 'https://6821-2605-59c8-3091-d710-2dca-a845-3b04-f811.ngrok-free.app/api/v1/process';

async function main() {
  const consumer = channel => async msg => {
    if (msg) {
      // Display the received message
      console.log(msg.content.toString())

      // Send to webserver
      const result = await fetch(url, {
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'payload': msg.content.toString() })
      });

      console.debug('fetched', result.status)

      // Acknowledge the message, otherwise RabbitMQ will keep re-trying.
      channel.ack(msg)
    }
  }

  const connection = await client.connect(
    'amqp://guest:guest@127.0.0.1:5672'
  )

  // Create a channel
  const channel = await connection.createChannel()
  // Makes the queue available to the client
  await channel.assertQueue('myQueue')
  // Start the consumer
  await channel.consume('myQueue', consumer(channel))
}

main();
