import { useState } from 'react';
import { useFormik } from 'formik';

import styles from './CreateProduct.module.scss';
import Layout from '../../components/layout/layout';
import Dropzone from '../../components/dropzone/dropzone'
import InputForm from '../../components/form/inputForm/inputForm';
import ErrorForm from '../../components/form/errorForm/errorForm';
import * as validationForm from '../../services/validationForm'

const CreateProduct = () =>{
    const [selectedFile, setSelectedFile] = useState<File>();


    async function handleSubmit(data: validationForm.FormValuesCreateProduct){
        const dataProduct = new FormData(); 

        dataProduct.append('name', data.name);
        dataProduct.append('price', data.price);
        dataProduct.append('quantity', data.quantity);
        dataProduct.append('size', data.size);

        if(selectedFile){
            dataProduct.append('image', selectedFile)
        }

        //const response = await servicesVehicle.createVehicle(data)

        return dataProduct;

    }

    const formik  = useFormik({
        initialValues: validationForm.initialValuesCreateProduct,
    
        validationSchema: validationForm.schemaCreateProduct,
    
        enableReinitialize: true,

        onSubmit: async (data) => {
            const response = await handleSubmit(data);
            
            console.log('data enviado', response)
    
            //formik.resetForm();
            //alert(`Veículo ${response} cadastrado com sucesso!`);
            //navigate('/')
        }
    });

    return(
        <Layout>
            <div className={styles.Content}>
                       
                <form
                    className={styles.Form}
                    onSubmit={formik.handleSubmit}
                >  
                    <h2>Cadastro de produtos</h2>
                    <div className={styles.ContentForm}>            
                        <Dropzone
                            onFileUploaded={setSelectedFile}
                            message='Escolher imagem do produto'              
                        />

                        <div className={styles.ContentColumn}>
                            <div className={styles.ContentRow}>
                                <div className={styles.ContentColumn}>
                                    <InputForm
                                        info="Nome do produto"
                                        placeholder='Nome'
                                        name="name"
                                        type="text"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.name && formik.touched.name && <ErrorForm message={formik.errors.name}/>}
                                </div>
                                <div className={styles.ContentColumn}>
                                    <InputForm
                                        info="Preço do produto"
                                        placeholder='Somente o número'
                                        name="price"
                                        type="number"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.price && formik.touched.price && <ErrorForm message={formik.errors.price}/>}
                                </div>
                            </div>
                        
                        
                            <div className={styles.ContentRow}>
                                <div className={styles.ContentColumn}>
                                    <InputForm
                                        info="Quantidade do Produto"
                                        placeholder='N° de produtos no estoque'
                                        name="quantity"
                                        type="number"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.quantity && formik.touched.quantity && <ErrorForm message={formik.errors.quantity}/>}
                                </div>

                                <div className={styles.ContentColumn}>
                                    <p className={styles.nameField}> Tamanho: </p>
                                    <select name="size" onChange={formik.handleChange}>
                                        {validationForm.sizes.map((size, key) =>(                            
                                            <option key={key} value={size}> 
                                                {size}
                                            </option>                         
                                        ))}
                                    </select>
                                    {formik.errors.size && formik.touched.size && <ErrorForm message={formik.errors.size}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.ButtonSendProduct} type='submit'>
                        Finalizar Cadastro
                    </button>                 
                </form>
                
            </div>
        </Layout>
    )   
}

export default CreateProduct;

