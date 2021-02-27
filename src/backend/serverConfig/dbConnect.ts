import mongoose from 'mongoose';

async function dbConnect(): Promise<typeof mongoose | undefined> {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return process.env.NODE_ENV === 'production' ?
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@${process.env.MONGODB_REMOTE_URI}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }) :
    mongoose.connect(`mongodb://localhost:27017/${process.env.MONGODB_LOCAL_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
}

export default dbConnect;