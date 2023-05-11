import express from 'express';
import PersonController from '../controllers/PersonController.js';
import multer from 'multer';
import PersonDetails from '../models/PersonDetails.js';
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

PersonsRouter.get('/', PersonController.getAllPersons)
PersonsRouter.get('/:id',PersonController.getById)
//זה מציין שרק קובץ אחד יעלה 
PersonsRouter.post('/:id', upload.single('file'),async function(req, res) {
    const id = req.params.id;
    console.log(id)
    const image = {
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
    console.log(image)
    try{
    const person = await PersonDetails.findByIdAndUpdate(id, { $set: { image: image }});
    res.status(200).json('Image added to person');
    }catch (err) {
      console.log(err);
      res.status(500).send('Error updating person with image');
    }
  });
PersonsRouter.post('/', PersonController.add)

export default PersonsRouter;