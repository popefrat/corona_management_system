import mongoose from "mongoose";

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        require:true,
        minlength: [2, 'Full name must be at least 2 characters'],
    },
    identityCard: {
        type: String,
        require:true,
        unique: true,
        validate: {
            validator: function(v) {
              return /^[0-9]{9}$/.test(v);
            },
            message: props =>`${props.value} is not a valid please enter another!`
          }
    },
    Address:{
        city:{type:String},
        street:{type:String},
        number:{type:Number}
    },
    DateOfBirth: {
        type:Date,
        require:true,
        validate: {
            validator: function(v) {
              return v < new Date();//בודקת אם התאירך לידה קטן מהתאריך הנוכחי 
            },
            message: props => `${props.value} is not a valid date of birth!`
          }
    },
    Phone:{
        type:String,
        require:true,
        validate:{
        validator: function(v) {
            //  אמת תקינות זו בודקת שהמספר מתחיל באפס ושזה ספרות וכו אם כן תחזיר
            return /^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        }
    },
    MobilePhone:
    {
        type:String,
        require:true,
        validate:{
        validator: function(v) {
            return /^05\d([\d]{0,1})([-]{0,1})\d{7}$/.test(v);
          },
          message: props => `${props.value} is not a valid mobile phone number!`
        }
    },
    image:{
            name:String,
            data: Buffer,
            contentType: String
    }
    
})

export default mongoose.model('Person', PersonSchema)
 
  