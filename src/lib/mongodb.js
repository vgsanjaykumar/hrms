import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://vgssanjay:sanjay%4096@cluster0.yqmgw.mongodb.net/hrms";

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI');
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'HRMS', // use exact existing DB name to avoid casing issue
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;
    return cached.conn;
}
