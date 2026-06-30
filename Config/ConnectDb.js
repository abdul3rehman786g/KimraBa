import mongoose from "mongoose"

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB Connected Successfully")
  } catch (error) {
    console.log("DB Error", error)
  }
}

export default connectDB
