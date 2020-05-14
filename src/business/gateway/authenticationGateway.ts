export interface AuthenticationGateway {
  generateToken(input: UsersInfoForToken): string;
  getUsersInfoFromToken(token: string): UsersInfoForToken;
}

export interface UsersInfoForToken {
  id: string;
}
