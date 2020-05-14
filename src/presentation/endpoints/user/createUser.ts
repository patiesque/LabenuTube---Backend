import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";
import { CreateUserUC } from "../../../business/usecase/user/createUser";

export const createUserEndpoint = async (req: Request, res: Response) => {
  try {
    const createUserUC = new CreateUserUC(
      new UserDB(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await createUserUC.execute({
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
