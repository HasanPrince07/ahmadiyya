const express = require("express")
const app = express()
app.use(express.json())
const userRouter = require("./router/user")
const adminRouter = require("./router/admin")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/ahmadiyya')


app.use(express.static("public"))
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.listen(5000, () => { console.log(`server is running on port 5000`) })