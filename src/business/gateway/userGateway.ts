import { User } from "../entities/user";

export interface UserGateway {
  createUser(user: User): Promise<void>;
  loginUser(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  updatePassword(password: string, id: string): Promise<void>;

}
