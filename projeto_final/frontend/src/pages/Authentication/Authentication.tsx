import { useState,  ChangeEvent, useEffect, } from "react"
import { useNavigate } from "react-router-dom";
import { Puff } from  'react-loader-spinner';

import styles from "./Authentication.module.scss"
import * as icon from '../../components/icons/index'
import InputForm from "../../components/form/inputForm/inputForm"
import ButtonForm from "../../components/form/ButtonForm/buttonForm"
import useAuth from "../../data/hooks/useAuth"


const Authentication = () =>{
    const { userLogged, loginGoogle, loginNormal, registerUser, msgError,loading} = useAuth();
    const navigate = useNavigate();
    const [ screen, setScreen] = useState<'Login' | 'Register'>('Login')
    const [ email, setEmail] = useState<string>('')
    const [ password, setPassword] = useState<string>('')
    const [ confirmPassword, setConfirmPassword] = useState<string>('')
    const [newMsgError, setNewMsgError] = useState<string | null>('')
    const [renderError, setRenderError] = useState<boolean>(false);


    useEffect(() =>{ 
        if(userLogged === true) navigate('/') 
    },[userLogged])

    useEffect(() =>{
        if(msgError !== ''){
            setNewMsgError(msgError || 'Unknow Error')
            setRenderError(true)
        }      
    },[msgError])


    function handlSendData(){
        try{
            if(screen=== 'Login') {loginNormal?.(email, password)}         
            else if(screen=== 'Register') {registerUser?.(email, password, confirmPassword)}   
        }catch(err){
            if (err instanceof Error) setNewMsgError(err.message);
            else setNewMsgError('Unknow Error');   
            setRenderError(true)
        }
    }
   
   
    function handleForgotPassword() {

    }

    return(     
        <div className={styles.Container}>
            <img
                className={styles.ImageScreenAuthentication}
                src="https://d1ih8jugeo2m5m.cloudfront.net/2021/08/loja-de-camisetas-online.jpg"
                alt="Imagem da tela de autenticação"
            />

            <div className={styles.ContainerForm}>             
                <p className={styles.Title}>
                    {screen === 'Login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </p>

                {renderError ? 
                    <div className={styles.ContentErrors}>
                        <i>{icon.alert}</i>
                        <a>{newMsgError}</a>
                    </div>                 
                :   null
                }
                           
                <div className={styles.ContentForm}>
                    <InputForm
                        name={'email'}
                        info={'Email do usuário'}
                        value={email}
                        type={'email'}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    <InputForm
                        name={'password'}
                        info={'Senha'}
                        value={password}
                        type={'password'}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />

                    {screen === 'Login' ? 
                        <p  className={styles.ForgetPassword}>                 
                            <a onClick={() => handleForgotPassword()}> Esqueceu a senha? </a>
                        </p>
                    : 
                        <InputForm
                            name={'confirmPassword'}
                            info={'Repita a Senha'}
                            value={confirmPassword}
                            type={'password'}
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        />
                    }

                    <ButtonForm
                        message={screen === 'Login' ? 'Entrar' : 'Cadastrar'}
                        onClick={() => handlSendData()}
                    />    

                    {loading  ? 
                        <div className={styles.ContentLoading}>
                            <Puff height = "40" width = "40"color = 'white'/>
                            <a> Autenticando Usuário...</a>
                        </div>
                    :   null
                    }            

                    {screen === 'Login' ?  
                        <>
                            <button className={styles.ButtonGoogle} onClick={loginGoogle}>
                                Entrar com Google
                                <i>{icon.google}</i>
                            </button>
                            <p className={styles.InfoLogin}>
                                Novo por aqui?
                                <a  onClick={() => {setScreen('Register'); setRenderError(false)}}>
                                    Crie uma conta grautitamente.
                                </a>
                            </p>
                        </>
                    :
                        <p className={styles.InfoLogin}>
                            Já tem uma conta?
                            <a onClick={() => {setScreen('Login'); setRenderError(false)}}> 
                                Faça login aqui. 
                            </a>
                        </p>              
                    }
                </div>            
            </div>
        </div>
    )
}

export default Authentication