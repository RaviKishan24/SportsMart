require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./sprtsdatabase');


const { UserRouter, router } = require("./routes/user");
const cartRouter = require('./routes/cart');
const productRouter = require('./routes/product');
const { adminRouter, admin } = require('./routes/admin');
const { orderRouter } = require('./routes/orders');

const server = express();
const PORT = process.env.PORT || 7000;

connectDB()

server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: "https://sportsmart11.netlify.app",
    credentials: true,
}))

server.use('/Auth', UserRouter);
server.use("/Product", productRouter);
server.use('/Cart', cartRouter)
server.use('/Admin', adminRouter)
server.use('/api', router)
server.use('/adminApi', admin)
server.use("/orders",orderRouter)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});



