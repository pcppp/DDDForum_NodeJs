export class User {
  constructor(
    public readonly id: number | null,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public readonly firstName?: string | null,
    public readonly lastName?: string | null
  ) {}

  static create({ id, email, username, password, firstName, lastName }: User) {
    // 可放入邮箱/用户名格式校验
    return new User(id, email, username, password, firstName, lastName);
  }
}
