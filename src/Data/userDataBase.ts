import { BaseDB } from "./baseDatabase";
import { User } from "../business/entities/user";
import { UserGateway } from "../business/gateway/userGateway";
import { DuplicateUserError } from "../business/error/DuplicateUserError";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "Users";

  private mapDBUserToUser(input?: any): User | undefined {
    return (
      input &&
      new User(
        input.id,
        input.name,
        input.email,
        input.birthday,
        input.image,
        input.password,
      )
    )
  }


  public async createUser(user: User) {
    try {
      await this.connection
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          birthday: user.getBirthday(),
          image: user.getImage(),
          password: user.getPassword(),
        })
        .into(this.userTableName);
    } catch (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        throw new DuplicateUserError()
      } else {
        throw err
      }
    }
  }

  public async loginUser(email: string): Promise<User | undefined> {
    const user = await this.connection.raw(`
      SELECT *
      FROM ${this.userTableName}
      WHERE email='${email}'
  `)

    if (!user[0][0]) {
      return undefined;
    }
    console.log(user)

    return await this.mapDBUserToUser(user[0][0]);

  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
          SELECT * FROM ${this.userTableName} 
          WHERE id = '${id}'
        `);

    if (!result[0][0]) {
      return undefined;
    }

    return await this.mapDBUserToUser(result[0][0])

  }


  public async updatePassword(password: string, id: string): Promise<void> {
    await this.connection.raw(`
        UPDATE ${this.userTableName} 
        SET password = '${password}'
        WHERE id = '${id}';
      `);
  }

}