/* 
    importing Mongoose library
    it provides schema-based solution to model application data
    simplifies working with MongoDB by providing features like 
    query and validation
*/
import mongoose from "mongoose";

// defining a function that thats a single argument 'url'
const connectDB = (url) => {
    /* 
        method returns a Promoise that resolves
        when connection to DB is established
        or rejects when there is an error.
    */
    return mongoose.connect(url);
};

/* 
    default exports of the module
    allows other parts of the app
    to import and use connectDB()
*/
export default connectDB;
