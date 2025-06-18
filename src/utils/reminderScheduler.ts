import cron from 'node-cron';
import Todo from '../models/todo';
import User from '../models/user';
import { sendReminderEmail } from './email';

// Runs every minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    // Find todos with reminderTime in the past, not sent, and not completed/deleted
    const todos = await Todo.find({
        reminderTime: { $lte: now, $ne: null },
        isReminderSent: false,
        isCompleted: false,
        isDeleted: false,
    });

    for (const todo of todos) {
        // Find user email (assuming username is email)
        const user = await User.findById(todo.userId);
        if (user && user.username) {
            try {
                await sendReminderEmail(todo, user.username);
                todo.isReminderSent = true;
                await todo.save();
            } catch (err) {
                console.error('Failed to send reminder for Todo:', todo._id, err);
            }
        }
    }
});
