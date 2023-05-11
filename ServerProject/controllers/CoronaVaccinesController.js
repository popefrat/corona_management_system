import CorornaVaccines from '../models/CoronaVaccines.js';

const CoronaVaccinesController ={

    getAllCorornaVaccines:async(req,res)=>
    {
       try{
             const getCoronaVaccines = await CorornaVaccines.find();
             res.json(getCoronaVaccines);
       }
       catch(e){
          res.status(400).json({message: e.message});
       }
    },
    getById:async(req,res)=>{
        try{
         let CoronaVaccines =await CorornaVaccines.findOne({PersonId:req.params.id});
         res.json(CoronaVaccines)
        } catch(e){
            res.status(400).json({message: e.message});
         }
    },

     add:async(req,res)=>
    {
        const addCorornaVaccines = req.body;
        if(addCorornaVaccines.DateOfGettingVaccinated!=null&&addCorornaVaccines.DateOfGettingVaccinated.length>4)
        {
            res.send('error DateOfGettingVaccinated array length must be less than or equal to 4" ')
        }
        if(addCorornaVaccines.DateOfGettingVaccinated!=null&&
                addCorornaVaccines.DateOfGettingVaccinated.length!=addCorornaVaccines.ManufacturerVaccine.length)
                res.send('error ManufacturerVaccine array length must be equal to DateOfGettingVaccinated array length')
        
        if(addCorornaVaccines.DateOfResult>addCorornaVaccines.DateOfRecovery)
        res.send('DateOfRecovery cant be before DateOfResult')
        try
        {
           const newCorornaVaccines = await CorornaVaccines.create((addCorornaVaccines)); 
           res.json(newCorornaVaccines);
        }
        catch(e)
        {
            res.status(400).json({message: e.message});
        }
    },
}
export default CoronaVaccinesController;

