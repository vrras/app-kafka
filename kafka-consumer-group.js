const kafka = require("kafka-node");

const options = {
  kafkaHost: 'localhost:9092',
  groupId: 'kakfaTest',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  protocol: ['roundrobin'],
  encoding: 'utf8',
  fromOffset: 'latest',
  commitOffsetsOnFirstJoin: true,
  outOfRangeOffset: 'earliest',
  onRebalance: (isAlreadyMember, callback) => { callback(); } // or null
};


const consumerGroup = new kafka.ConsumerGroup(options, 'topic-nodejs-lagi');

consumerGroup.on("message", function (message) {
  console.log(message.value);
  consumerGroup.commit((error, data) => {
    if (error) {
      console.error(error);
    }
  });
});

consumerGroup.on("error", function (err) {
  console.log("error", err);
});

process.on("SIGINT", function () {
  consumerGroup.close(true, function () {
    process.exit();
  });
});