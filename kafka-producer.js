const kafka = require('kafka-node'),
  HighLevelProducer = kafka.HighLevelProducer,
  client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
  }),
  producer = new HighLevelProducer(client),
  payloads = [];

producer.on('ready', function () {
  for (let i = 0; i < 10; i++) {
    payloads.push({ topic: 'topic-nodejs-lagi', messages: `Data ke ${i}` });
  }
  producer.send(payloads, function (err, data) {
    if (err) {
      console.log('Error: ', err);
    }

    process.exit();
  });
});