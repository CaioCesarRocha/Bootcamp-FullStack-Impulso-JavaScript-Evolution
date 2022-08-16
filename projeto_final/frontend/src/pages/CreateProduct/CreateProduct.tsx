import { useState, useEffect} from 'react';
import { useFormik } from 'formik';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import styles from './CreateProduct.module.scss';
import Layout from '../../components/layout/layout';
import Dropzone from '../../components/dropzone/dropzone';
import Alert from '../../components/alerts/alert';
import InputForm from '../../components/form/inputForm/inputForm';
import ErrorForm from '../../components/form/errorForm/errorForm';
import ButtonForm from '../../components/form/ButtonForm/buttonForm';
import * as validationForm from '../../services/validationForm';
import * as ProductService from '../../services/product.services';
import useAuth from '../../data/hooks/useAuth';


const CreateProduct = () =>{
    const [selectedFile, setSelectedFile] = useState<File>();
    const { userLogged, user, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        toast.info('Necessário login com uma conta de administrador')
        setTimeout(() =>{
            if(!userLogged || !user?.isAdmin) navigate(-1)                
        },5000);
    }, [])


    const formik  = useFormik({
        initialValues: validationForm.initialValuesCreateProduct,
    
        validationSchema: validationForm.schemaCreateProduct,
    
        enableReinitialize: true,

        onSubmit: async (data) => {
            if(selectedFile){
                const response = await ProductService.createProduct(data,selectedFile);

                if(response === 201){
                    //formik.resetForm();
                    toast.success(`Produto ${data.name} cadastrado com sucesso!`);
                    //navigate('/')
                }else if(response === 400) toast.error('Produto com este nome já existe no banco!')              
            } 
            else{ toast.warn('Selecione uma imagem') }        
        }
    });


    return(
        <Layout>
            <div className={styles.Content}>
                <Alert theme='colored'/>       
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

                    <ButtonForm message='Finalizar Cadastro'/>             
                </form>
                
            </div>
        </Layout>
    )   
}

export default CreateProduct;

