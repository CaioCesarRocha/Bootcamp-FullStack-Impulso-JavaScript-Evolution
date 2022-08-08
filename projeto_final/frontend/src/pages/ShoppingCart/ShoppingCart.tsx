import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ShoppingCart.module.scss'
import Layout from '../../components/layout/layout';
import Alert from '../../components/alerts/alert';
import CardItem from '../../components/cardItem/cardItem';
import * as icon from '../../components/icons/index';
import * as UsersService from '../../services/user.services';
import { IProduct } from '../../services/interfaces/product.interface'
import useAuth from '../../data/hooks/useAuth';

const ShoppingCart = () =>{
    const [products, setProducts] = useState<IProduct[]>([])
    const navigate = useNavigate();
    const {user, userLogged} = useAuth();

    useEffect(() =>{
        async function getProducts(){
            if(userLogged && user?.uid){
                const response: IProduct[] = await UsersService.getShoppingCart(user?.uid);
                setProducts(response)   
            }else{              
                toast.info('Necessário fazer login')
                navigate('/authentication');            
            }             
        }
        getProducts()
    }, [])

    return (
        <Layout>
            <div className={styles.Container}>
                <Alert theme='colored'/>
                <h2> Meu Carrinho</h2>
                {products.length > 0 ?                     
                    <div className={styles.RenderContent}>
                        {products.map((product, key) =>(
                            <CardItem
                                key={key}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                size={product.size}
                                infoButton={'Remover da Lista'}
                                colorButton={'#d14947'}
                            />
                        ))}              
                    </div>
                :                
                    <div className={styles.ContentNotFound}>
                        <i>{icon.sad}</i>
                        <p>Nenhum produto foi encontrado na pesquisa.</p>
                    </div>
                }  
            </div>
        </Layout>
    )
}

export default ShoppingCart;