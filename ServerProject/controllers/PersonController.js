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
}
export default PersonController;