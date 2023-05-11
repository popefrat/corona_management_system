import express from "express";
import CoronaVaccinesController from '../controllers/CoronaVaccinesController.js';

const CoronaRouter = express.Router();

CoronaRouter.get('/', CoronaVaccinesController.getAllCorornaVaccines)
CoronaRouter.get('/:id',CoronaVaccinesController.getById)
CoronaRouter.post('/', CoronaVaccinesController.add)

export default CoronaRouter;