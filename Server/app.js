const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const PORT = process.env.PORT


app.get('/',(req,res)=>{
    res.send("<h1>The server is up and running...</h1>")
})


app.post('/api/users/register',(req,res)=>{
    res.send('Register User')
})

app.post('/api/users/login',(req,res)=>{
    res.send('Login User')
})

app.get('/apt/users/check',(req,res)=>{
    res.send('Check User')
})

app.listen(PORT,(err)=>{
    if (err) {
        console.log("Err: ", err.message)
    }

    console.log(`The server is running on http://127.0.0.1:${PORT}`)
})
