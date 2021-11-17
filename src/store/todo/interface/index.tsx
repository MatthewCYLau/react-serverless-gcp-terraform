export interface Todo extends CreateTodoBody {
  todo_id: number;
  time_created: string;
}

export interface CreateTodoBody {
  subject: string;
  body: string;
}

export type TodosList = Todo[];
