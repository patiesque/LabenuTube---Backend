import { UserGateway } from "../../gateway/userGateway";
import { AuthenticationGateway } from "../../gateway/authenticationGateway";
import { CryptographyGateway } from "../../gateway/cryptographyGateway";
import { IncorrectPasswordOrEmail } from "../../error/IncorrectPasswordOrEmail";

export class LoginUserUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) { }

  public async execute(input: LoginUserUCInput): Promise<LoginUserUCOutput> {
    const user = await this.userGateway.loginUser(input.email);

    if (!user) {
      throw new IncorrectPasswordOrEmail;
    }

    if (!await this.cryptographyGateway.compare(input.password, user.getPassword())) {
      throw new IncorrectPasswordOrEmail;
    }

    const token = this.authenticationGateway.generateToken({
      id: user.getId()
    });

    return { message: "User successfully logged in", token }
  }
}
export interface LoginUserUCInput {
  email: string;
  password: string;
}

export interface LoginUserUCOutput {
  message: string;
  token: string
}

