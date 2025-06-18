import nodemailer from 'nodemailer';
import { ITodo } from '../models/todo';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendReminderEmail(todo: ITodo, to: string) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Todo Reminder',
        text: `Reminder: ${todo.title}\nDescription: ${todo.description}\nDue: ${todo.dueDate}`,
    };
    return transporter.sendMail(mailOptions);
}
