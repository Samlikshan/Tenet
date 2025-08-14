export interface IUserRepository {
  create(username: string, email: string, password: string): Promise<void>;
  findByEmail(email: string): Promise<{ email: string }>;
  findUser(
    email: string,
  ): Promise<{ id: number; email: string; username: string; password: string }>;
}
