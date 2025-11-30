require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Mongo for seq test');

    const { initStorage } = await import('./storage');
    const storage = await initStorage();

    const sample = {
      name: 'Seq Test User',
      phone: '+911234567890',
      email: 'seqtest@example.com',
      passengers: 2,
      pickupLocation: 'A',
      dropLocation: 'B',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
    };

    const b1 = await storage.createBooking(sample);
    console.log('Created booking 1 id:', b1.id);
    const b2 = await storage.createBooking(sample);
    console.log('Created booking 2 id:', b2.id);

    process.exit(0);
  } catch (err) {
    console.error('seq test error', err);
    process.exit(1);
  }
})();
