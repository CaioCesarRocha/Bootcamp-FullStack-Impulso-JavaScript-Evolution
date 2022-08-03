import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from './perfil.module.scss'
import * as icon from '../../components/icons';
import useAuth from "../../data/hooks/useAuth";
import Layout from "../../components/layout/layout";


const Perfil = () =>{
    const { userLogged, user, logoutGoogle} = useAuth()
    const navigate = useNavigate();

    useEffect(() =>{
        console.log('user', user)
        if(userLogged === false) navigate('/authentication')
    },[])

    async function handleLogoutGoogle(){
        console.log('paSSEI LOGOUt ')
        await logoutGoogle;
        console.log('paSSEI LOGOUt 2222')
        navigate('/')
    }

    return(
        <Layout>
            <div className={styles.ContentButton}>
                <button className={styles.ButtonLogout} onClick={logoutGoogle}>
                    <i>{icon.logout}</i>
                    <a>Sair </a>
                </button>
            </div>
        </Layout>  
    )
}


export default Perfil;