import { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'

import styles from './dropzone.module.scss';
import * as icon from '../icons/index'

interface propsDropzone{
    onFileUploaded: (file: File) => void;
    message: string;
    rounded?: string;
  }


const Dropzone: React.FC<propsDropzone>= ({onFileUploaded, message, rounded}) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

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
                    alt='Imagem do produto'
                />
            :
                <div className={styles.DropPlace}>
                    <i>
                        {icon.upload}
                    </i>
                    {message}
                </div>       
            }
        </div>
    )
}


export default Dropzone;