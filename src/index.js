import {app} from "./app.js";
import DBconnect from "./db/index.js";


DBconnect.connect()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error)=>{
            console.log("DB connection failed",error);
        })
    


