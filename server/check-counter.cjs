require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const counters = mongoose.connection.collection('counters');
  console.log('before:', await counters.findOne({_id: 'bookingSeq'}));
  const r = await counters.findOneAndUpdate({_id: 'bookingSeq'}, { $inc: { seq: 1 } }, { returnDocument: 'after' });
  console.log('after findOneAndUpdate:', r);
  const now = await counters.findOne({_id: 'bookingSeq'});
  console.log('current counters doc:', now);
  await mongoose.disconnect();
})();