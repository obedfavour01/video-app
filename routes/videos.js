import express from "express"
import { addVideo, addView, deleteVideo, getByTags, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js'
import { verifyToken } from "../verifyToken.js";

const router = express.Router();


//create a video

router.post("/",verifyToken, addVideo)

router.put("/:videoId", verifyToken, updateVideo)


router.delete("/:videoId",verifyToken, deleteVideo)


router.get("/find/:videoId", getVideo)


router.put("/view/:videoId",addView)

router.get("/trend", trend)


router.get("/random", random)

router.get("/sub",verifyToken, sub)

router.get("/tags", getByTags)

router.get("/search", search)






export default router