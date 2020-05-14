import { BaseDB } from "./baseDatabase";
import { User } from "../business/entities/user";
import { UserGateway } from "../business/gateway/userGateway";
import { DuplicateUserError } from "../business/error/DuplicateUserError";

export class UserDB extends BaseDB implements UserGateway {
    private userTableName = "Users";

    async createUser(user: User) {
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

    async loginUser(email: string): Promise<User | undefined> {
        const user = await this.connection
            .select("*")
            .from(this.userTableName)
            .where({ email: email });
        if (!user[0]) {
            return undefined;
        }

        return new User(
            user[0].id,
            user[0].name,
            user[0].email,
            user[0].birthday,
            user[0].image,
            user[0].password
        )
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const result = await this.connection.raw(`
          SELECT * FROM ${this.userTableName} 
          WHERE id = '${id}'
        `);
    
        if (!result[0][0]) {
          return undefined;
        }

        return new User(
          result[0][0].id,
          result[0][0].name,
          result[0][0].email,
          result[0][0].birthday,
          result[0][0].image,
          result[0][0].password
        );
      }


    public async updatePassword(password: string, id: string): Promise<void> {
        await this.connection.raw(`
        UPDATE ${this.userTableName} 
        SET password = '${password}'
        WHERE id = '${id}';
      `);
    }

}