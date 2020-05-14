import { Request, Response } from "express";
import { CreateVideoUC } from "../../../business/usecase/video/createVideo";
import { VideoDB } from "../../../data/videoDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const createVideoEndpoint = async (req: Request, res: Response) => {
  try {
    const createVideoUC = new CreateVideoUC(
      new VideoDB(),
      new JwtAuthorizer()
    );

    const auth = req.headers.Authorization || req.headers.authorization

    const result = await createVideoUC.execute({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      token: auth as string,

    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
