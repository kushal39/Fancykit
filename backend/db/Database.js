const mongoose = require("mongoose");


const connectDatabase = () =>{
    mongoose.connect("mongodb://localhost:27017/Fancykit",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`mongodb is connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase