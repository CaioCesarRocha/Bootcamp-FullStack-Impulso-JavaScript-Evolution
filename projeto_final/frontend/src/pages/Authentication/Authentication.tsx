import { useState,  ChangeEvent, useEffect, } from "react"
import { useNavigate } from "react-router-dom";

import styles from "./Authentication.module.scss"
import * as icon from '../../components/icons/index'
import InputForm from "../../components/form/inputForm/inputForm"
import ButtonForm from "../../components/form/ButtonForm/buttonForm"
import useAuth from "../../data/hooks/useAuth"



const Authentication = () =>{
    const { userLogged, loginGoogle} = useAuth();
    const navigate = useNavigate();
    const [ screen, setScreen] = useState<'Login' | 'Register'>('Login')
    const [ email, setEmail] = useState<string>('')
    const [ password, setPassword] = useState<string>('')
    const [ confirmPassword, setConfirmPassword] = useState<string>('')
    const [msgError, setMsgError] = useState<string | null>('')
    const [renderError, setRenderError] = useState<boolean>(false);


    useEffect(() =>{ 
        if(userLogged === true) navigate('/') 
    },[userLogged])


    function handlSendData(){
        console.log('datas', email, password, confirmPassword)
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
                    <p className={styles.ContentErrors}>
                        <i>{icon.alert}</i>
                        {msgError}
                    </p>                 
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
                            <a onClick={() => handleForgotPassword()}>
                                Esqueceu a senha?
                            </a>
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

                    <button className={styles.ButtonGoogle} onClick={loginGoogle}>
                        Entrar com Google
                        <i>{icon.google}</i>
                    </button>

                    {screen === 'Login' ? 
                        <p className={styles.InfoLogin}>
                            Novo por aqui?
                            <a  onClick={() => {setScreen('Register'); setMsgError(null)}}>
                                Crie uma conta grautitamente.
                            </a>
                        </p>
                    :
                        <p className={styles.InfoLogin}>
                            Já tem uma conta?
                            <a onClick={() => setScreen('Login')}>
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