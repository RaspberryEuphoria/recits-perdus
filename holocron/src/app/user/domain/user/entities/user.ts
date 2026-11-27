type User = {
  id: number;
  email: string;
  name: string;
  password: string;
};

type CreateUserDto = {
  email: string;
  name: string;
  password: string;
};

type LoginDto = Pick<User, 'email' | 'password'>;

export { CreateUserDto, LoginDto, User };
