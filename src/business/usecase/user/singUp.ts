import { UserGateway } from "../../gateway/userGateway";
import { AuthenticationGateway } from "../../gateway/authenticationGateway";
import { CryptographyGateway } from "../../gateway/cryptographyGateway";
import { v4 } from "uuid";
import { MinimumCharacterError } from "../../error/MinimumCharacterError";
import { User } from "../../entities/user";


export class SingUpUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
    ) {}

  public async execute(input: SingUpUCInput): Promise<SingUpUCOutput> {
    
      const id = v4();
      const pass = await this.cryptographyGateway.encrypt(input.password)
      const user = new User(id,  input.name, input.email, input.birthday, input.image ,pass);

      if (input.password.length < 6) {
        throw new MinimumCharacterError();
      }
      
      await this.userGateway.createUser(user);
    
      const token = this.authenticationGateway.generateToken({
        id: user.getId()
      })
   
      return {
        message: "User created successfully " + token
      };
  }
}
export interface SingUpUCInput {
  name: string;
  email: string;
  birthday:string;
  image: string;
  password: string;
}

export interface SingUpUCOutput {
  message: string;
}
