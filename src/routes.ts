import express, { Request, Response } from "express";
import { createUserEndpoint } from "./presentation/endpoints/user/createUser";
import { loginUserEndpoint } from "./presentation/endpoints/user/loginUser";
import { updatePasswordEndpoint } from "./presentation/endpoints/user/updatePassword";
import { createVideoEndpoint } from "./presentation/endpoints/video/createVideo";
import { getAllVideosUserByIdEndpoint } from "./presentation/endpoints/video/getAllVideosUserByIdUC";
import { updateVideoEndpoint } from "./presentation/endpoints/video/updateVideo";
import { deleteVideoEndpoint } from "./presentation/endpoints/video/deleteVideo";
import { feedOfVideosEndpoint } from "./presentation/endpoints/video/feedOfVideos";
import { getVideoDetailEndpoint } from "./presentation/endpoints/video/getVideoDetail";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json()); // Linha mágica (middleware)

app.post("/user/create", createUserEndpoint);
app.post("/user/login", loginUserEndpoint);
app.post("/user/password", updatePasswordEndpoint);

app.post("/video/create", createVideoEndpoint);
app.get("/video/user", getAllVideosUserByIdEndpoint);
app.post("/video/update/:id", updateVideoEndpoint);
app.delete("/video/delete/:id", deleteVideoEndpoint);
app.get("/feed", feedOfVideosEndpoint)
app.get("/video/detail/:id", getVideoDetailEndpoint);

export default app;