export type Task = {
  _id?: string;
  text: string;
  createdAt?: Date;
};

export type TaskFormElements = HTMLFormElement & {
  text: HTMLInputElement;
};
