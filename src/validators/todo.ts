import Joi from 'joi';

export const getHistory = {
    params: Joi.object({
        date: Joi.date().iso().required(),
    }),
};

export const store = {
    params: Joi.object({
        todo_id: Joi.string().optional().allow(null),
    }),
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        dueDate: Joi.date().iso().required(),
        reminderTime: Joi.date().iso().optional().allow(null),
    }),
};

export const todoDelete = {
    params: Joi.object({
        todo_id: Joi.string().required(),
    }),
};

export const changeStatus = {
    params: Joi.object({
        todo_id: Joi.string().required(),
    }),
    query: Joi.object({
        isCompleted: Joi.boolean().required(),
    }),
};

export const updateReminder = {
    params: Joi.object({
        todo_id: Joi.string().required(),
    }),
    body: Joi.object({
        reminderTime: Joi.date().iso().required(),
    }),
};