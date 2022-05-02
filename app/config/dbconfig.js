
const mongoose=require(`mongoose`)

mongoose
    .connect("mongodb://localhost:27017/nodeJs", { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

        console.log("connected to database")

      
        
        
    })
    // mongoose.set('debug', true);
    
    
