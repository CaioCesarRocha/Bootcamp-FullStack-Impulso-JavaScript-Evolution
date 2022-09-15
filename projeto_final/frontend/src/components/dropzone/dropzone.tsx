import { useState, useCallback, useEffect } from 'react';
import {useDropzone} from 'react-dropzone'

import styles from './dropzone.module.scss';
import * as icon from '../icons/index'

interface propsDropzone{
    onFileUploaded: (file: File) => void;
    message: string;
    valueInitial?: string;
    altImage?: string
  }


const Dropzone: React.FC<propsDropzone>= ({onFileUploaded, message, valueInitial, altImage}) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    useEffect(() =>{
        if(valueInitial === `http://${process.env.REACT_APP_LINUX_IP}:5000/uploads/noAvatar`){
            setSelectedFileUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/User.svg/2048px-User.svg.png')
        }
        else if(valueInitial) setSelectedFileUrl(valueInitial)
    }, [valueInitial])

    const onDrop = useCallback( (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const fileURL = URL.createObjectURL(file); //criar a url do arquivo
        setSelectedFileUrl(fileURL);
        onFileUploaded(file)
    }, [onFileUploaded])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        //accept: 'image/*', //aceitar qualquer tipo de imagem
    })

    return (
        <div className={styles.Content} {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' name="imgProduct"/>
            {selectedFileUrl ? 
                <img
                    src={selectedFileUrl}
                    alt={altImage || 'Imagem do Produto'}
                />
            :
                <div className={styles.DropPlace}>
                    <i>{icon.upload}</i>
                    {message}
                </div>       
            }
        </div>
    )
}

export default Dropzone;