import NavBar from "../navBar/navBar";
import styles from "./layout.module.scss";
import useAuth from '../../data/hooks/useAuth'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface PropsLayout{
    children?: any
}

const Layout = (props: PropsLayout) =>{
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        console.log('user', user)
    },[])

    return(        
        <div className={styles.Content}>
            <NavBar/>
            <div className={styles.ContentPerfil}>
                <a onClick={() => navigate('/Perfil')}>
                    {user?.name || 'Fazer login'}
                </a>
                <img 
                    onClick={() => navigate('/Perfil')}
                    src={user?.imgUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/User.svg/2048px-User.svg.png'}
                    alt="Avatar do usuário"
                />
            </div>
            {props.children}
        </div>
    )
}


export default Layout;