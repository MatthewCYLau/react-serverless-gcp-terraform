export interface User {
  username: string;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
