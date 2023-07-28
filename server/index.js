
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const userRouter = require('./routes/userRouter')

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
  })
)



app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));


app.use("/",userRouter)


const server = app.listen(process.env.PORT,()=>{
  console.log(`Server started at PORT ${process.env.PORT}`)
})