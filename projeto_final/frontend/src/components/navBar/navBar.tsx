import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './navBar.module.scss';
import * as icon from '../icons/index'
import useAuth from '../../data/hooks/useAuth';
import * as UsersService from '../../services/user.services';
import { setProductsList } from '../../redux/reducers/productsReducer';
import { useAppSelector } from '../../redux/useAppSelector';
import { IProduct } from '../../services/interfaces/product.interface';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


const NavBar = () =>{
    const [numProducts, setNumProducts] = useState<number>(0)
    const navigate = useNavigate();
    const dispatchProducts = useDispatch();
    const numProductsRedux = useAppSelector(state => state.products.numProducts)
    const {user, userLogged} = useAuth();

    useEffect(() =>{
        setNumProducts(numProductsRedux)
    }, [numProductsRedux])

    useEffect(() =>{
        async function getShoppingCart(){
            if(userLogged && user?.uid){
                const response: IProduct[] = await UsersService.getShoppingCart(user?.uid);

                const sendingProducts = (products: IProduct[]) => dispatchProducts(setProductsList(products))
               
                sendingProducts(response)
            }
        }
        getShoppingCart()
    },[])

    return(
        <header className={styles.header}>
            <>
                <a onClick={() => navigate('/')}>
                    <img
                        src="/images/logo_DIO.png"
                        alt="Logo Empresa"
                    />
                </a>
                
                <a onClick={() => navigate('/')}>
                    DIO E-Commerce
                </a>
            </>

            { user?.isAdmin ? 
                <a onClick={() => navigate('/CreateProduct')} className={styles.Option}>
                    <i>{icon.add}</i>                  
                </a>
            :   
                <a onClick={() => navigate('/ShoppingCart')} className={styles.Option}>
                    <div className={styles.NumShopCart}> {numProducts}</div>
                    <i>{icon.shopCart}</i>
                </a>
            }                         
        </header>
    )
}

export default NavBar;