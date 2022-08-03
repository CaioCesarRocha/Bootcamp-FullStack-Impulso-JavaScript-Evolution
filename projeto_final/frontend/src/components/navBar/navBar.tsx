import styles from './navBar.module.scss';
import * as icon from '../icons/index'
import { useNavigate } from 'react-router-dom';


const NavBar = () =>{
    const navigate = useNavigate();
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

            <a onClick={() => navigate('/Favorites')} className={styles.ContainerOptions}>
                <div className={styles.NumShopCart}> 0</div>
                <i>{icon.shopCart}</i>
            </a>
        </header>
    )
}

export default NavBar;