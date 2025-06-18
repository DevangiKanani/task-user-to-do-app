import express from 'express';
import { validate } from 'express-validation';
import { storeUpdateTodo, getTodoHistory, deleteTodo, changeTodoStatus, updateReminderTime } from '../controllers/todo';
import { getHistory, store, todoDelete, changeStatus, updateReminder } from '../validators/todo';
import isAuth from '../middlewares/auth'

const router = express.Router();

router.get('/history/:date', isAuth, validate(getHistory), getTodoHistory);
router.post('/', isAuth, validate(store), storeUpdateTodo);
router.delete('/:todo_id', isAuth, validate(todoDelete), deleteTodo);
router.put('/complete/:todo_id', isAuth, validate(changeStatus), changeTodoStatus);
router.put('/reminder/:todo_id', isAuth, validate(updateReminder), updateReminderTime);

export default router;
