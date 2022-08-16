import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import styles from './ShoppingCart.module.scss';
import * as UsersService from '../../services/user.services';
import { IProduct } from '../../services/interfaces/product.interface'
import { useAppSelector } from '../../redux/useAppSelector';
import Layout from '../../components/layout/layout';
import Alert from '../../components/alerts/alert';
import CardItem from '../../components/cardItem/cardItem';
import * as icon from '../../components/icons/index';


const ShoppingCart = () =>{
    const [theme, setTheme] = useState(styles.light)
    const [products, setProducts] = useState<IProduct[]>([]);

    const listProducts = useAppSelector(state => state.products.productsList);
    const themeRedux = useAppSelector(state => state.theme.theme);

    useEffect(() =>{
        if(themeRedux === 'dark') setTheme(styles.dark)
        if(themeRedux === 'light') setTheme(styles.light)
    },[themeRedux])


    useEffect(() =>{
        setProducts(listProducts)
    }, [listProducts])

    return (
        <Layout>
            <div className={theme}>
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
            </div>
        </Layout>
    )
}

export default ShoppingCart;