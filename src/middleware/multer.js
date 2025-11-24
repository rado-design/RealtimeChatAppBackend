const multer = require('multer');

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,path.join(__dirname,'../../public/images'),(error,success)=>{
//             if(error) throw error ;
//         })
//     },
//     filename:(req,file,cb)=>{
//         const name = Date.now()+'-'+file.originalname;
//         cb(null,name,(error,success)=>{
//             if(error) throw error ;
//         })
//     }
// })
const storage = multer.memoryStorage()

const upload = multer({storage:storage});


module.exports = upload