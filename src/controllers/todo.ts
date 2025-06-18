import moment from 'moment';
import { Response } from 'express';
import Todo, { ITodo } from '../models/todo';
import CustomRequest from '../middlewares/custom';

//get to-do history
const getTodoHistory = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { params: { date }, user } = req;

        const userId = user?._id;
        const startDate = moment(date).toISOString();
        const endDate = moment(date).add(1, 'day').toISOString();

        const todoHistory = await Todo.find({
            userId,
            dueDate: { $gte: startDate, $lte: endDate },
        });

        res.status(200).json(todoHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//create/update to-do
const storeUpdateTodo = async (req: CustomRequest, res: Response) => {
    try {
        const { query: { todo_id }, body: { title, description, dueDate, reminderTime }, user } = req;

        let result = null;

        if (todo_id) {
            // update to-to
            result = await Todo.findByIdAndUpdate(
                todo_id,
                { title, description, dueDate },
                { new: true }
            );
            if (!result) return res.status(404).json({ error: 'Todo not found' });
        } else {
            //create to-do
            const userId = user?._id;

            const newTodo: ITodo = new Todo({
                title,
                description,
                dueDate: moment(dueDate).toISOString(),
                userId,
                reminderTime: reminderTime ? moment(reminderTime).toISOString() : null,
            });

            result = await newTodo.save();
        }
        const message = todo_id ? 'Todo updated successfully' : 'Todo created successfully'
        res.json({ data: result, message: message });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//delete to-do
const deleteTodo = async (req: CustomRequest, res: Response) => {
    try {
        const { params: { todo_id }, user } = req;

        const deletedTodo = await Todo.findByIdAndUpdate(
            todo_id,
            { isDeleted: true, deletedAt: Date.now(), deletedBy: user?._id },
            { new: true }
        );

        if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// mark as compeleted or unmark as completed
const changeTodoStatus = async (req: CustomRequest, res: Response) => {
    try {
        const { params: { todo_id }, query: { isCompleted } } = req;
        const completed = isCompleted === 'true';
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todo_id, isDeleted: false },
            { isCompleted: completed },
            { new: true }
        );

        if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });

        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update reminderTime for a todo
const updateReminderTime = async (req: CustomRequest, res: Response) => {
    try {
        const { params: { todo_id }, body: { reminderTime }, user } = req;
        const todo = await Todo.findOneAndUpdate(
            { _id: todo_id, userId: user?._id, isDeleted: false },
            { reminderTime: moment(reminderTime).toISOString(), isReminderSent: false },
            { new: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ data: todo, message: 'Reminder time updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { storeUpdateTodo, getTodoHistory, deleteTodo, changeTodoStatus, updateReminderTime };

