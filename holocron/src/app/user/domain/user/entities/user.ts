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

export { CreateUserDto, User };
