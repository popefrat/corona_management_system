import PersonDetails from '../models/PersonDetails.js'

const PersonController = {

    getAllPersons:async(req,res)=>
    {
       try{
             const persons = await PersonDetails.find();
             res.json(persons);
       }
       catch(e){
          res.status(400).json({message: e.message});
       }
    },
    getById:async(req,res)=>{
        try{
         let personById =await PersonDetails.findOne({identityCard:req.params.id});
         res.json(personById)
        } catch(e){
            res.status(400).json({message: e.message});
         }
    },
     add:async(req,res)=>
    {
        
        const addPerson = req.body;
        try
        {
           const newPerson = await PersonDetails.create((addPerson)); 
           res.json(newPerson);
        }
        catch(e)
        {
            res.status(400).json({message: e.message});
        }
    },
    addImage:async(req, res)=> {
        const id = req.params.id;
        // console.log(id)
        const image = {
          name: req.file.filename,
          contentType: req.file.mimetype
        };
        // console.log(image)
        try{
        const person = await PersonDetails.findByIdAndUpdate(id, { $set: { image: image }});
        res.status(200).json('Image added to person');
        }catch (err) {
          console.log(err);
          res.status(500).send('Error updating person with image');
    }},
    getImageById:async(req,res)=>{
        const id = req.params.id;
        // console.log(id)
        try {
          const person = await PersonDetails.findById(id);
        //   console.log(person)
          if (!person || !person.image) {
            return res.status(404).send('Person or image not found');
          }
          const { name, contentType } = person.image;
          res.set('Content-Type', contentType);
          res.download(`uploads/${name}`);
        } catch (error) {
          console.error('Error fetching person image:', error);
          res.status(500).send('Error fetching person image');
        }
    },
}
export default PersonController;