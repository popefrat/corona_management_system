import mongoose from 'mongoose'

const CoronaSchema = mongoose.Schema({
    PersonId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Person",
        require:false
    },
    DateOfGettingVaccinated:[{
        type:Date,
        require:false,
        sparse: true,//מאפשר להשאיר ערכים null
    }],
    ManufacturerVaccine:[{
         type:String,
         require:true,
         sparse: true,
    }],
    DateOfResult:{
        require:true,
           type:Date,
    },
    DateOfRecovery:{
        require:true,
         type:Date,
    }  
})
  export default mongoose.model('CoronaVaccines', CoronaSchema)
  
