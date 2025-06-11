import { Mongo } from 'meteor/mongo';
import { type Task } from './types';

export const TaskCollection = new Mongo.Collection<Task>('tasks');
