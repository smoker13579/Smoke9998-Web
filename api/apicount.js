import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://smoker3322:smoker33@cluster0.u9zvllt.mongodb.net/visitorsDB";

const connectDB = async () => {
  if (mongoose.connections[0].readyState === 1) return;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const VisitorSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

const Visitor = mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);

export default async function handler(req, res) {
  await connectDB();
  const count = await Visitor.countDocuments();
  res.status(200).json({ count });
}
