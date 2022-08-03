import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import styles from './UpdateProduct.module.scss';
import Layout from '../../components/layout/layout';
import Dropzone from '../../components/dropzone/dropzone'
import InputForm from '../../components/form/inputForm/inputForm';
import ErrorForm from '../../components/form/errorForm/errorForm';
import ButtonForm from '../../components/form/ButtonForm/buttonForm';
import * as validationForm from '../../services/validationForm';
import * as ProductService from '../../services/product.services';
import {FormValuesProduct} from '../../services/interfaces/product.interface';


const UpdateProduct = () =>{
    const [selectedFile, setSelectedFile] = useState<File>();
    const [valueProduct, setValuesProduct] = useState<FormValuesProduct>(
        {id: 0, name: '', price: 0, quantity: 0, size: '', image: ''}
    )
    const params = useParams();


    useEffect(() =>{
        const id = params.id || '0';
        async function getValuesProduct(){
            const values = await validationForm.getInitialValues(id) ;
            setValuesProduct(values)      
        }
        getValuesProduct()
    }, [])

    const handleResult = (response: number, name: string) =>{
        if(response === 200){
            //formik.resetForm();
            alert(`Produto ${name} atualizado com sucesso!`);
            //navigate('/')
        }else if(response === 400) alert('Produto com este nome já existe no banco!'); 
    } 


    const formik  = useFormik({
        initialValues: valueProduct,
    
        validationSchema: validationForm.schemaCreateProduct,
    
        enableReinitialize: true,

        onSubmit: async (data) => { 
            const id = params.id || '0';        
            if(selectedFile)  {
                const response = await ProductService.updateProduct(id, data,selectedFile);
                handleResult(response, data.name)
            }else{
                const response = await ProductService.updateProduct(id, data);
                handleResult(response,data.name)
            }                
        } 
    });


    return (
        <Layout>
            <div className={styles.Content}>
                <form
                    className={styles.Form}
                    onSubmit={formik.handleSubmit}
                >  
                    <h2>Atualizando Produto</h2>
                    <div className={styles.ContentForm}>            
                        <Dropzone
                            onFileUploaded={setSelectedFile}
                            message='Escolher imagem do produto'
                            valueInitial={formik.values.image}              
                        />
                        <div className={styles.ContentColumn}>
                            <div className={styles.ContentRow}>
                                <div className={styles.ContentColumn}>
                                    <InputForm
                                        info="Nome do produto"
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
                                        name="quantity"
                                        type="number"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.quantity && formik.touched.quantity && <ErrorForm message={formik.errors.quantity}/>}
                                </div>

                                <div className={styles.ContentColumn}>
                                    <p className={styles.nameField}> Tamanho: </p>
                                    <select 
                                        name="size" value={formik.values.size} onChange={formik.handleChange}
                                    >
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

                    <ButtonForm message='Enviar Atualização'/>
                </form>
            </div>
        </Layout>
    )
}

export default UpdateProduct;