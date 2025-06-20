import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Login.view.html';

export type LoginForm = HTMLFormElement & {
  username: HTMLInputElement;
  password: HTMLInputElement;
};

Template.login.events({
  'submit .login-form': function (event: Event) {
    event.preventDefault();

    const target = event.target as LoginForm;

    const username = target.username.value;
    const password = target.password.value;

    console.log({ username, password });

    Meteor.loginWithPassword(username, password);
  },
});
