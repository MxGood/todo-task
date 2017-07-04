export type Todo = {
  id?: number;
  text: string;
};

export type IState = {
    todos: Todo[];
    typeahead?: string;
};
