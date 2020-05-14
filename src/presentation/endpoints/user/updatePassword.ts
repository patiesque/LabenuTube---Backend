import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";
import { UpdatePasswordUC } from "../../../business/usecase/user/updatePassword";

export const updatePasswordEndpoint = async (req: Request, res: Response) => {
  const updatePasswordUC = new UpdatePasswordUC(
    new UserDB(),
    new JwtAuthorizer(),
    new BcryptService()
  );


  try {
    const auth = req.headers.Authorization || req.headers.authorization

    if(!auth){
      throw new Error("You need a Token to use this enpoint")

    }
    const result = await updatePasswordUC.execute({
      token: auth as string,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
