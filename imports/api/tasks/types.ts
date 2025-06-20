export type Task = {
  _id?: string;
  text: string;
  userId: string;
  createdAt?: Date;
  isChecked?: boolean;
};

export type TaskFormElements = HTMLFormElement & {
  text: HTMLInputElement;
};
