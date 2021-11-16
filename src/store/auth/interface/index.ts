export interface User {
  user_id: string;
  username: string;
  time_created: string;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}
