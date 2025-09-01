const { landing } = require('./Controller/userController')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const PORT = process.env.PORT

const userRoutes = require('./Routes/userRoute')

app.use("/api/users",userRoutes);

app.get("/", landing);

app.listen(PORT,(err)=>{
    if (err) {
        console.log("Err: ", err.message)
    }

    console.log(`The server is running on http://127.0.0.1:${PORT}`)
})
