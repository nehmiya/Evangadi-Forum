const { landing } = require('./Controller/userController')
const db = require('./DB/dbConfig')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

const userRoutes = require('./Routes/userRoute')

app.use("/api/users",userRoutes);

app.get("/", landing);


async function start (){
    try {
    const result = await db.connect
    console.log("DB Connected!!!")
    app.listen(PORT)
    console.log(`Listening on PORT: ${PORT}`)
   
} catch (error) {
    console.log("Err: ",error.message)
}

}

start();

