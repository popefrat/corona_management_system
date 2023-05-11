import mongoose from 'mongoose';

const uriLocal = process.env.DB_CONNECT;

const connectDB = async ()=>{
    await mongoose.connect(uriLocal);
};
const database = mongoose.connection;

database.on('error', (error)=>{
    console.log(error);
})

database.once('connected',()=>{
    console.log('Database Connected');
})

mongoose.set('toJSON',{//פונקציה זו הופכת את הקלט לפורמט גייסון
    virtuals:true,//מאפיינים וירטואליים יכללו בגיסון
    transform:(doc,converted)=>{
        delete converted._id;//ממפה את השדה _id שמוגו מגנרט לid בלי מקו תחתון 
    }
});
export default connectDB;