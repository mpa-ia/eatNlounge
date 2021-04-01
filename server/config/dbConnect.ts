import mongoose from 'mongoose';

export default async function dbConnect(): Promise<typeof mongoose | undefined> {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  return process.env.NODE_ENV === 'production' ?
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@${process.env.MONGODB_REMOTE_URI}`, dbConfig,
    ) :
    mongoose.connect(`mongodb://localhost:27017/${process.env.MONGODB_LOCAL_URI}`, dbConfig);
}
