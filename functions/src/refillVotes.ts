import cloudFn from '.';

exports.refillVotes = cloudFn.pubsub.topic('refillVotes').onPublish(() => {});
