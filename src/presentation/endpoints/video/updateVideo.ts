import { Request, Response } from "express";
import { UpdateVideoUC } from "../../../business/usecase/video/updateVideo";
import { VideoDB } from "../../../data/videoDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const updateVideoEndpoint = async (req: Request, res: Response) => {
    try {   
        const updateVideoUC = new UpdateVideoUC(new VideoDB(), new JwtAuthorizer());
        
        const auth = req.headers.Authorization || req.headers.authorization
        
        const result = await updateVideoUC.execute({
            token: auth as string,
            id: req.params.id,
            title: req.body ? req.body.title : "",
            description: req.body ? req.body.description : ""
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}