require('dotenv').config(); // this loads the .env file
const mongoose = require("mongoose")

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL)
      console.log("Database Connect Successfully")
   } catch (error) {
      console.log("Error Occured due to connection failure:", error.message)
      process.exit(1);  // Exit the process with failure

   }
}

module.exports = {
   connectDB,
}