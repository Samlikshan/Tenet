const TYPES = {
  IUserRepository: Symbol.for("IUserRepository"),
  RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
  LoginUserUseCase: Symbol.for("LoginUserUseCase"),
  AuthController: Symbol.for("AuthController"),
  IJwtService: Symbol.for("IJwtService"),
  IBcryptService: Symbol.for("IBcryptService"),
  IAuthMiddleware: Symbol.for("IAuthMiddleware"),
};

export default TYPES;
