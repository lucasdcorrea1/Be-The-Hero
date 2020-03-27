const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const Profilecontroller = require('./controllers/Profilecontroller');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/ongs', OngController.index);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), Profilecontroller.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentsController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentsController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentsController.delete);

module.exports = routes;