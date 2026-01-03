import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import mongoose from 'mongoose';
(async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri)
            throw new Error('No MONGODB_URI in server/.env');
        await mongoose.connect(uri);
        console.log('connected mongo');
        const { initStorage } = await import('./storage');
        const storage = await initStorage();
        const payload = {
            name: 'Seq TS Test',
            phone: '+911111111111',
            email: 'seqts@example.com',
            passengers: 1,
            pickupLocation: 'X',
            dropLocation: 'Y',
            startDate: new Date().toISOString().split('T')[0],
            startTime: '10:00',
        };
        const counters = mongoose.connection.collection('counters');
        console.log('counters before any:', await counters.findOne({ _id: 'bookingSeq' }));
        const b1 = await storage.createBooking(payload);
        console.log('booking1 id:', b1.id);
        console.log('counters after first:', await counters.findOne({ _id: 'bookingSeq' }));
        const b2 = await storage.createBooking(payload);
        console.log('booking2 id:', b2.id);
        console.log('counters after second:', await counters.findOne({ _id: 'bookingSeq' }));
        await mongoose.disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
