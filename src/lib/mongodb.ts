import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = "mongodb+srv://vgssanjay:sanjay%4096@cluster0.yqmgw.mongodb.net/hrms";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI');
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: Cached;
}

let cached: Cached = global._mongoose || { conn: null, promise: null };

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'HRMS',
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  global._mongoose = cached;
  return cached.conn;
}
