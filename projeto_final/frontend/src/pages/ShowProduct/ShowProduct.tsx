import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';

import styles from './ShowProduct.module.scss';
import * as icon from '../../components/icons/index';
import Layout from '../../components/layout/layout';
import * as ProductService from '../../services/product.services';
import {IProduct} from '../../services/interfaces/product.interface';


const ShowProduct = () =>{
    const [product, setProduct] = useState<IProduct>(
        {id: 0, name: '', price: 0, quantity: 0, size: '', image: ''}
    )

    const params = useParams();

    useEffect(() =>{
        const id = params.id || '0'
        async function getProduct(){
            const response: IProduct = await ProductService.getOneProduct(id);
            setProduct(response)           
        }
        getProduct()
    }, [params.id])


    return(
        <Layout>
            {product.id !== 0 ? 
                <div className={styles.Content}>
                    <img src={product.image} alt="Imagem do produto"/>
                    <div className={styles.ContentInfo}>
                        <h1>{product.name}</h1>

                        <div className={styles.RowInfo}>
                            <div className={styles.Info}> Preço: </div> 
                            <div className={styles.InfoValue}> R$: {product.price}</div>
                        </div>

                        <div className={styles.RowInfo}>
                            <div className={styles.Info}> Quantidade: </div> 
                            <div className={styles.InfoValue}> {product.quantity} und. </div>
                        </div>

                        <div className={styles.RowInfo}>
                            <div className={styles.Info}> Tamanho: </div> 
                            <div className={styles.InfoValue}> {product.size} </div>
                        </div>

                        <div className={styles.Info}> Calcule o valor do frete:</div>
                        <div className={styles.CalcCep}>
                            <input
                            placeholder='Insira seu CEP'  
                            />
                            <button className={styles.ButtonSearchCEP}>
                                {icon.search}
                            </button>
                        </div>
                        
                        {product.quantity !== 0 ?
                            <button  className={styles.FinishOKShop}>
                                Finalizar Compra
                            </button>
                        :
                            <button style={{ backgroundColor:'#ccc', color: 'white', cursor: 'text'}} 
                                className={styles.FinishOKShop}
                            >
                                Finalizar Compra
                            </button>
                        }
   
                    </div>
                </div>
            :
                <div className={styles.ContentError}>
                    <i>{icon.alert}</i>
                    <p>Nada foi encontrado. Tente novamente mais tarde.</p>
                </div>           
            }       
        </Layout>
    )
}

export default ShowProduct;