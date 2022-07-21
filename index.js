import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"






const app = express();
dotenv.config()
const port = 5000;

const connect = () => {
    mongoose.connect(process.env.MONGO).then(()=> {
        console.log("Connected to db")
    })
    .catch( (err) => {
        throw err;
    })
}
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)


app.use((err,req,res,next) => {
        const status = err.status || 500;
        const message = err.message || "Something went wrong";

        return res.status(status).json({
            success:false,
            status,
            message,
        })
})

process.setMaxListeners(0);

app.listen(port, ()=> {

    connect()
    console.log("Connected")
})