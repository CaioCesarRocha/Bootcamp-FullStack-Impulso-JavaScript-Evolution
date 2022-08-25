import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ForceAuthentication from '../forceAuthentication/forceAuthentication';
import NavBar from "../navBar/navBar";
import styles from "./layout.module.scss";
import { useAppSelector } from "../../redux/useAppSelector";
import useAuth from '../../data/hooks/useAuth'



interface PropsLayout{
    children?: any
    username?: string,
    avatar?:string
}

const Layout = (props: PropsLayout) =>{
    const [theme, setTheme] = useState(styles.light)
    const {user} = useAuth();
    const navigate = useNavigate();
    const themeRedux = useAppSelector(state => state.theme.theme);
   

    useEffect(() =>{
        if(themeRedux === 'dark') setTheme(styles.dark)
        if(themeRedux === 'light') setTheme(styles.light)
    },[themeRedux])

 
    return(   
        <ForceAuthentication> 
            <div className={theme}>
                <div className={styles.Content}>             
                    <NavBar/>
                    
                    <div className={styles.ContentPerfil}>
                        <a href="#/" onClick={() => navigate('/Perfil')}>
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
            </div>
        </ForceAuthentication> 
    )
}


export default Layout;