import { Template } from 'meteor/templating';

import { Blaze } from 'meteor/blaze';
import { ReactiveDict } from 'meteor/reactive-dict';
import { TaskCollection } from '../../api/tasks/TaskCollection';
import { TaskFormElements } from '../../api/tasks/types';
import '../components/Login';
import '../components/Task';
import './App.view.html';

type MainContainerInstance = Blaze.TemplateInstance & {
  state: ReactiveDict;
};

const HIDE_COMPLETED_STRING = 'hideCompleted';
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const getTasksFilter = () => {
  const user = getUser();

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  return { userFilter, pendingOnlyFilter };
};

Template.mainContainer.onCreated(function () {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  tasks: function () {
    const instance = Template.instance() as MainContainerInstance;
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    return TaskCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
      sort: { createdAt: -1 },
    }).fetch();
  },
  hideCompleted: function () {
    const template = Template.instance() as MainContainerInstance;
    return template.state.get(HIDE_COMPLETED_STRING);
  },
  incompleteCount: function () {
    if (!isUserLogged()) {
      return '';
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount = TaskCollection.find(pendingOnlyFilter).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  },
});

Template.mainContainer.events({
  'click #hide-completed-button': function (
    event: Event,
    instance: MainContainerInstance
  ) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
  'click .user': function () {
    Meteor.logout();
  },
});

Template.form.events({
  'submit .task-form': function (event: Event) {
    event.preventDefault();

    const target = event.target as TaskFormElements;
    const text = target.text.value;

    if (!text) return;

    const user = getUser();

    if (!user) {
      console.error('User not logged. Aborting...');
      return;
    }

    TaskCollection.insert({
      text,
      userId: user._id,
      createdAt: new Date(),
    });

    target.text.value = '';
  },
});
