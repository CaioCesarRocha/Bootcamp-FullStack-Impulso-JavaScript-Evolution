import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Puff } from  'react-loader-spinner';

import styles from './forceAuthentication.module.scss'
import useAuth from '../../data/hooks/useAuth';


export default function ForceAuthentication(props: any){
    const { loading, user} = useAuth();   
    const navigate = useNavigate();
    const [renderContent, setRenderContent] = useState(false)


    useEffect(() =>{
        //se nao tiver carregando e usuário setado entao verifica autenticação
        if(!loading && user?.email)  setRenderContent(true)
        //se tiver só carregando entao libera o gif Loading...
        else if(loading) setRenderContent(false)
        // Se nao tiver carregando e sem user setado então força autenticação
        else navigate('/authentication')  
    }, [])


    return(
        <div className={styles.Container}>
            {renderContent ?
                <>
                    <script  
                        //id="handleLogin"
                        //strategy="afterInteractive"
                        dangerouslySetInnerHTML={{ //para rodar um html aqui
                            __html:`
                                if(!document.cookie?.includes("dio-ecommerce-cod3r-auth")){
                                    window.location.href = "/authentication"
                                }
                            `
                        }}
                    />   
                    {props.children}
                </>             
            :   
                <div className={styles.RenderLoading}>   
                    <p>Carregando tela....</p>
                    <Puff height = "80" width = "80"color = 'white'/>
                </div>  
            }         
        </div>
    )    
}