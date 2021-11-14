export interface Todo {
  subject: string;
  body: string;
}

export interface CreateTodoBody extends Todo {
  owner: string;
}
