require('dotenv').config({ path: './server/.env' });
const { MongoClient } = require('mongodb');

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) return console.error('No MONGODB_URI in server/.env');

  const client = new MongoClient(uri, { serverApi: '1', tls: true });
  try {
    await client.connect();
    console.log('\nConnected to MongoDB (test-db)');
    const db = client.db();
    const bookings = db.collection('bookings');
    const now = new Date();
    const doc = {
      id: 'test-' + now.getTime(),
      name: 'Test User',
      phone: '+911234567890',
      email: 'test@example.com',
      passengers: 2,
      pickupLocation: 'A',
      dropLocation: 'B',
      startDate: now.toISOString(),
      startTime: now.toTimeString().split(' ')[0],
      status: 'pending',
      createdAt: now,
    };

    const result = await bookings.insertOne(doc);
    console.log('Inserted id:', result.insertedId);

    const found = await bookings.findOne({ id: doc.id });
    console.log('Found doc:', !!found);
    console.log(found);
  } catch (err) {
    console.error('DB test error:', err);
  } finally {
    await client.close();
    console.log('Closed connection');
  }
})();
