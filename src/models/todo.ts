import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  dueDate: Date;
  userId: mongoose.Types.ObjectId;
  isCompleted: Boolean;
  isDeleted: Boolean;
  deletedBy: mongoose.Types.ObjectId;
  deletedAt: Date;
  reminderTime?: Date;
  isReminderSent?: Boolean;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Types.ObjectId, default: null },
  deletedAt: { type: Date, default: null },
  reminderTime: { type: Date, default: null },
  isReminderSent: { type: Boolean, default: false },
});

export default mongoose.model<ITodo>('todo', TodoSchema);
