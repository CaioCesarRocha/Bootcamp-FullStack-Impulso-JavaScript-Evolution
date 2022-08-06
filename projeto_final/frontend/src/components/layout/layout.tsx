import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ForceAuthentication from '../forceAuthentication/forceAuthentication';
import NavBar from "../navBar/navBar";
import styles from "./layout.module.scss";
import useAuth from '../../data/hooks/useAuth'


interface PropsLayout{
    children?: any
}

const Layout = (props: PropsLayout) =>{
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        console.log('user', user?.imgUrl)
        console.log(`http://${process.env.REACT_APP_LINUX_IP}:5000/uploads/noAvatar`)
    },[])

    return(   
        <ForceAuthentication>    
            <div className={styles.Content}>
                <NavBar/>
                <div className={styles.ContentPerfil}>
                    <a onClick={() => navigate('/Perfil')}>
                        {user?.name || 'Fazer login'}
                    </a>
                    {user?.imgUrl === `http://${process.env.REACT_APP_LINUX_IP}:5000/uploads/noAvatar` ?
                    <img 
                        onClick={() => navigate('/Perfil')}
                        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/User.svg/2048px-User.svg.png'}
                        alt="Avatar do usuário"
                    />
                    :
                        <img 
                            onClick={() => navigate('/Perfil')}
                            src={user?.imgUrl}
                            alt="Avatar do usuário"
                        />
                    }
                </div>
                {props.children}
            </div>
        </ForceAuthentication> 
    )
}


export default Layout;