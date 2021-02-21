const mongoose = require('mongoose')

try{
    mongoose.connect("mongodb+srv://admin:YCj4ixa76KMWQB0f@ydays-cluster.c8ov1.mongodb.net/ydays-app-db?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
} catch(e){
    console.log("|-| Error: connection\n"+e)
}