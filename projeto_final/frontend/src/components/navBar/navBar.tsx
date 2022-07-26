import styles from './navBar.module.scss';
import * as icon from '../icons/index'


const NavBar = () =>{
    return(
        <header className={styles.header}>
            <>
                <a  href="http://localhost:3001/">
                    <img
                        src="/images/logo_DIO.png"
                        alt="Logo Empresa"
                    />
                </a>
                
                <a href="http://localhost:3001/" >
                    DIO E-Commerce
                </a>
            </>

            <a href="http://localhost:3001/favorites" className={styles.ContainerOptions}>
                <div className={styles.NumShopCart}> 0</div>
                <i>{icon.shopCart}</i>
            </a>
        </header>


    )
}


export default NavBar;