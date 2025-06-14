import { Template } from 'meteor/templating';

import { TaskCollection } from '../../api/tasks/TaskCollection';
// import './App.styles.css';
import './App.view.html';

Template.mainContainer.helpers({
  tasks() {
    return TaskCollection.find();
  },
});

Template.form.events({
  'submit .task-form'(event: Event) {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const text = target.text.value;

    TaskCollection.insert({
      text,
      createdAt: new Date(),
    });

    target.text.value = '';
  },
});
