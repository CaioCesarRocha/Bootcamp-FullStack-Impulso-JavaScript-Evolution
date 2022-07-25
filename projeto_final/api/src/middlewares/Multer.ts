import multer from 'multer';
import path from 'path'; 
import crypto from 'crypto'; //gerar um hash aleatorio de dados

export default{
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'public', 'uploads'),//aonde os arquivos vao parar quando subidos
        filename: (req, file, cb) =>{
            const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
            if(allowed.includes(file.mimetype)){
                const hash = crypto.randomBytes(6).toString('hex'); // tamanho 6, sendo convertido para hexadecimal
                const fileName = `${hash}-${file.originalname}`; //mescla o hash com o nome, para ainda identificar o arquivo

                cb(null, fileName);
            }else{
                const fileName = ''
                cb(null, fileName)
            }
           
        }     
    }),
};