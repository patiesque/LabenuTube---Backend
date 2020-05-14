import { Request, Response } from "express";
import { DeleteVideoUC } from "../../../business/usecase/video/deleteVideo";
import { VideoDB } from "../../../data/videoDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";


export const deleteVideoEndpoint = async (req: Request, res: Response) => {
    try {
        const deleteVideoUC = new DeleteVideoUC(new VideoDB(), new JwtAuthorizer());

        const auth = req.headers.Authorization || req.headers.authorization

        const result = await deleteVideoUC.execute({
            token: auth as string,
            id: req.params.id
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}