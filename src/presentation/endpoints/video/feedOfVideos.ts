import { Request, Response } from "express";
import { FeedOfVideosUC } from "../../../business/usecase/video/feedOfVideos";
import { VideoDB } from "../../../data/videoDataBase";


export const feedOfVideosEndpoint = async (req: Request, res: Response) => {
    try{
        const uc = new FeedOfVideosUC(new VideoDB())

        const result = await uc.execute({
            page: Number(req.query.page)
        });

        res.status(200).send(result)
    } catch(err) {
        console.log(err)
        res.status(400).send({
            message: err.message
        })
    }
}