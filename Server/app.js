const { landing } = require('./Controller/userController')
const db = require('./DB/dbConfig')
const authMiddleware = require('./Middleware/authMiddleware')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT

const userRoutes = require('./Routes/userRoute')
const questionsRoutes= require('./Routes/questionRoute')

app.use("/api/users",userRoutes);
app.use("/api/questions", authMiddleware,questionsRoutes);


app.get("/", landing);


async function start (){
    try {
    const result = await db.getConnection();
    result && console.log('DB Connected!!');
   
    app.listen(PORT)
    console.log(`Listening on PORT: ${PORT}`)
   
} catch (error) {
    console.log("Err: ",error.message)
}

}

start();

