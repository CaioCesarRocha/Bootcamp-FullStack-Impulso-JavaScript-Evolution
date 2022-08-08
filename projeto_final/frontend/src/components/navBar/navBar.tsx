import styles from './navBar.module.scss';
import * as icon from '../icons/index'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../data/hooks/useAuth';

const NavBar = () =>{
    const navigate = useNavigate();
    const {user} = useAuth();

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
                    <div className={styles.NumShopCart}> 0</div>
                    <i>{icon.shopCart}</i>
                </a>
            }              
            
        </header>
    )
}

export default NavBar;