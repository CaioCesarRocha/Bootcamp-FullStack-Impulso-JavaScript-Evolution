import { useState,  ChangeEvent, useEffect, } from "react"
import { useNavigate } from "react-router-dom";
import { Puff } from  'react-loader-spinner';
import styles from "./Authentication.module.scss"
import * as icon from '../../components/icons/index'
import InputForm from "../../components/form/inputForm/inputForm"
import ButtonForm from "../../components/form/ButtonForm/buttonForm"
import useAuth from "../../data/hooks/useAuth"


const Authentication = () =>{
    const { userLogged, loginGoogle, loginNormal, registerUser, msgError,loading, forgotPassword} = useAuth();
    const navigate = useNavigate();
    const [ screen, setScreen] = useState<'Login' | 'Register'>('Login')
    const [ email, setEmail] = useState<string>('')
    const [ password, setPassword] = useState<string>('')
    const [ confirmPassword, setConfirmPassword] = useState<string>('')
    const [newMsgError, setNewMsgError] = useState<string | null>('')
    const [renderError, setRenderError] = useState<boolean>(false);

    useEffect(() =>{
        if(userLogged === true) navigate('/') 
    },[userLogged, navigate])

    useEffect(() =>{
        if(msgError !== ''){
            setNewMsgError(msgError || 'Unknow Error')
            setRenderError(true)
        }      
    },[msgError])

    function handleError(err: unknown){
        if (err instanceof Error) setNewMsgError(err.message);
        else setNewMsgError('Unknow Error');   
        setRenderError(true)
    }

    function handlSendData(){
        try{
            if(screen==='Login') {loginNormal?.(email, password)}         
            if(screen==='Register') {registerUser?.(email, password, confirmPassword)}   
        }
        catch(err){ handleError(err) }
    }
   
    async function handleForgotPassword() {
        if(!email){
            setNewMsgError('Digite um e-mail válido para enviarmos a redefinição de senha.')
            setRenderError(true)
        }
        else{
            try{ await forgotPassword?.(email)}
            catch(err){ handleError(err) }   
        }
    }

    function renderDataForm(){
        return(
            <>
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
                    <a href="#/" onClick={() => handleForgotPassword()}> Esqueceu a senha? </a>
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
            </>   
        )
    }

    function renderAnotherOptions(){
        return(<>
            {loading  ? 
                <div className={styles.ContentLoading}>
                    <Puff height = "40" width = "40"color = 'white'/>
                    <a href="#/"> Autenticando Usuário...</a>
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
                        <a href="#/" onClick={() => {setScreen('Register'); setRenderError(false)}}>
                            Crie uma conta grautitamente.
                        </a>
                    </p>
                </>
            :
                <p className={styles.InfoLogin}>
                    Já tem uma conta?
                    <a href="#/" onClick={() => {setScreen('Login'); setRenderError(false)}}> 
                        Faça login aqui. 
                    </a>
                </p>              
            }
        </>)
    }

    function renderForm(){
        return(
            <div className={styles.ContainerForm}>             
                <p className={styles.Title}>
                    {screen === 'Login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </p>
                {renderError ? 
                    <div className={styles.ContentErrors}>
                        <i>{icon.alert}</i>
                        <a href="#/">{newMsgError}</a>
                    </div>                 
                :   null
                }                          
                <div className={styles.ContentForm}>
                    {renderDataForm()}
                    {renderAnotherOptions()}                       
                </div>            
            </div>
        )
    }

    return(     
        <div className={styles.Container}>
            <img
                className={styles.ImageScreenAuthentication}
                src="https://d1ih8jugeo2m5m.cloudfront.net/2021/08/loja-de-camisetas-online.jpg"
                alt="Imagem da tela de autenticação"
            />
            {renderForm()}
        </div>
    )
}

export default Authentication