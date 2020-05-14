import { Request, Response } from "express";
import { SingUpUC } from "../../../business/usecase/user/singUp";
import { UserDB } from "../../../data/userDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";

export const singUpEndpoint = async (req: Request, res: Response) => {
  try {
    const SingUPUC = new SingUpUC(
      new UserDB(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await SingUPUC.execute({
      name: req.body.name,
      email: req.body.email,
      birthday: req.body.birthday,
      image: req.body.photo,
      password: req.body.password,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
