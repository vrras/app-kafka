const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const payloads = [
  {
    topic: 'topic-nodejs-lagi',
    partition: 0,
  },
  {
    topic: 'topic-nodejs-lagi',
    partition: 1,
  },
  {
    topic: 'topic-nodejs-lagi',
    partition: 2,
  },
];

const options = {
  groupId: 'kafka-node-group',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'utf8',
  fromOffset: false, // from beginning
};

const consumer = new kafka.Consumer(client, payloads, options);

consumer.on("message", function (message) {
  console.log(message.value);
  consumer.commit((error, data) => {
    if (error) {
      console.error(error);
    }
  });
});

consumer.on("error", function (err) {
  console.log("error", err);
});

process.on("SIGINT", function () {
  consumer.close(true, function () {
    process.exit();
  });
});