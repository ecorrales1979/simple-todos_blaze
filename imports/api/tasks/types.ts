export type Task = {
  _id?: string;
  text: string;
  createdAt?: Date;
  isChecked?: boolean;
};

export type TaskFormElements = HTMLFormElement & {
  text: HTMLInputElement;
};
