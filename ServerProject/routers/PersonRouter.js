import express from 'express';
import PersonController from '../controllers/PersonController.js';
import multer from 'multer';

const PersonsRouter = express.Router();
//מקבלת אוביקט עם 2 מאפיינם יעד ושם הקובץ היעד זה התיקייה uploads 
//ןשם הקובץ זה התאריך הנוכחי + jpg
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
});
const upload = multer({ storage: storage });

//זה מציין שרק קובץ אחד יעלה 
PersonsRouter.post('/:id', upload.single('file'),PersonController.addImage)
PersonsRouter.get('/', PersonController.getAllPersons)
PersonsRouter.get('/:id',PersonController.getById)
PersonsRouter.get('/:id/image',PersonController.getImageById)
PersonsRouter.post('/', PersonController.add)

export default PersonsRouter;