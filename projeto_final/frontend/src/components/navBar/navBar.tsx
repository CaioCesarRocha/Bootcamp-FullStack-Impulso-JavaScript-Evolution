import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DarkModeToggle from "react-dark-mode-toggle";

import styles from './navBar.module.scss';
import * as icon from '../icons/index'
import useAuth from '../../data/hooks/useAuth';
import * as UsersService from '../../services/user.services';
import { setProductsList } from '../../redux/reducers/productsReducer';
import { changeTheme } from '../../redux/reducers/themeReducer';
import { useAppSelector } from '../../redux/useAppSelector';
import { IProduct } from '../../services/interfaces/product.interface';


const NavBar = () =>{
    const [numProducts, setNumProducts] = useState<number>(0)
    const [checkedDarkMode, setCheckedDarkMode] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const numProductsRedux = useAppSelector(state => state.products.numProducts);
    const themeRedux = useAppSelector(state => state.theme.theme);
    const {user, userLogged} = useAuth();

    useEffect(() =>{
        setNumProducts(numProductsRedux)
    }, [numProductsRedux])

    useEffect(() =>{
        if(themeRedux === 'dark') setCheckedDarkMode(true)
        if(themeRedux === 'light') setCheckedDarkMode(false)
    }, [themeRedux])

    useEffect(() =>{
        async function getShoppingCart(){
            if(userLogged && user?.uid){
                const response: IProduct[] = await UsersService.getShoppingCart(user?.uid);
                const sendingProducts = (products: IProduct[]) => dispatch(setProductsList(products))              
                sendingProducts(response)
            }
        }
        getShoppingCart()
    },[dispatch, userLogged,user ])

    function handleTheme(){
        if(checkedDarkMode) {
            const changingTheme = (theme: string) => dispatch(changeTheme(theme))          
            changingTheme('light')                   
            setCheckedDarkMode(false)
        } 
        else {
            const changingTheme = (theme: string) => dispatch(changeTheme(theme))          
            changingTheme('dark')                
            setCheckedDarkMode(true)
        }
    }

    return(
        <header className={styles.header}>
            <>
                <a href="#/" onClick={() => navigate('/')}>
                    <img
                        src="/images/logo_DIO.png"
                        alt="Logo Empresa"
                    />
                </a>           
                <a href="#/" onClick={() => navigate('/')}> DIO E-Commerce </a>
            </>
            <div className={styles.ContentOption}>
                { user?.isAdmin ? 
                    <a href="#/"  onClick={() => navigate('/CreateProduct')} className={styles.Option}>
                        <i>{icon.add}</i>                  
                    </a>
                :   
                    <a href="#/" onClick={() => navigate('/ShoppingCart')} className={styles.Option}>
                        <div className={styles.NumShopCart}> {numProducts}</div>
                        <i>{icon.shopCart}</i>
                    </a>
                }
                <DarkModeToggle 
                    className={styles.Toggle}
                    onChange={() => handleTheme()}
                    checked={checkedDarkMode}
                    size={45}
                /> 
            </div>                                
        </header>
    )
}

export default NavBar;