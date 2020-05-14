import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { GetAllVideosUserByIdUC } from "../../../business/usecase/video/getAllVideosUserById";
import { VideoDB } from "../../../data/videoDataBase";

export const getAllVideosUserByIdEndpoint = async (req: Request, res: Response) => {
    try {
        const uc = new GetAllVideosUserByIdUC(
            new VideoDB(),
            new JwtAuthorizer());

        const auth = req.headers.Authorization || req.headers.authorization

        const result = await uc.execute({
            token: auth as string,
            id: req.query ? req.query.id as string : "" 
        }); 

        res.status(200).send(result);
        
    } catch (err) {
        res.status(400).send({
            message: err.message,
            ...err
        });
    }
};
