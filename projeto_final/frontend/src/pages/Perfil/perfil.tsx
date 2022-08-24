import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from './perfil.module.scss'
import * as icon from '../../components/icons';
import useAuth from "../../data/hooks/useAuth";
import Layout from "../../components/layout/layout";


const Perfil = () =>{
    const { userLogged, user, logout} = useAuth()
    const navigate = useNavigate();

    useEffect(() =>{
        if(userLogged === false) navigate('/authentication')
    },[userLogged, navigate])

    return(
        <Layout>
            <div className={styles.ContentButton}>
                <button className={styles.ButtonLogout} onClick={logout}>
                    <i>{icon.logout}</i>
                    <a href="#/"> Sair </a>
                </button>
            </div>
        </Layout>  
    )
}


export default Perfil;