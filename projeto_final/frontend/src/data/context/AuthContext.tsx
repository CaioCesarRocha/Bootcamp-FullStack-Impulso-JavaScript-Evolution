import { GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser, sendPasswordResetEmail,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, onIdTokenChanged,   
} from 'firebase/auth';
import { createContext, useEffect, useState, } from "react";
import Cookies from 'js-cookie';

import * as UsersService from '../../services/user.services';
import UserLogin from '../../services/interfaces/userFirebase.interface';
import { auth} from '../firebase/config';


interface AuthContextProps{
    user?: UserLogin | null,
    userLogged?: boolean, 
    loading?: boolean,
    msgError?: string,
    loginGoogle?: () => Promise<void>,
    loginNormal?: (email: string, password: string) => Promise<void>
    logout?: () => Promise<void>,
    registerUser?: (email: string, password: string, confirmPassword: string) => Partial<void>,
    updateUser?: (user: UserLogin) => Promise<void>
    forgotPassword?: (email: string) => Promise<void>,
}

const AuthContext= createContext<AuthContextProps>({    
})

//deixando os dados da forma como a gente quer receber
async function normalizeUser(userFirebase: FirebaseUser): Promise<UserLogin>{
    const token = await userFirebase.getIdToken() // espera pegar o token

    if(userFirebase.email){
        //checa se ja existe um usuário no banco para pegarmos os dados atualizados
        const res = await UsersService.getDataUser(userFirebase.email)  
        //se ainda nao existir, é necessário inserir
        if(res?.email.length === 0) await UsersService.saveDataUser(userFirebase);

        return {
            uid: res?.id || userFirebase?.uid,
            name: res?.nickname ||userFirebase?.displayName || '',
            email: userFirebase?.email,
            token,
            provider: userFirebase?.providerData[0].providerId,
            imgUrl: res?.avatar || userFirebase?.photoURL || '',
            isAdmin: res?.isAdmin || false
        }
    }
    return {uid: '', name: '', email: '', token: '', provider: '', imgUrl: '', isAdmin: false}
}

// salvando os dados do usuário em um cookie para nao perde-los no refresh da page...
function handleCookie(logged: boolean){
    if(logged){
        Cookies.set('dio-ecommerce-cod3r-auth', 'logged', {
            expires: 7 // os dados vão durar 7 dias
        })
    }
    else { Cookies.remove('dio-ecommerce-cod3r-auth') } // se tiver deslogado, exclui os dados 
}

export const AuthProvider = (props:any) =>{
    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const [user, setUser] = useState<UserLogin | null>(null);
    const [msgError, setMsgError] = useState<string>('');

    const correctStatusResponse = 201;

    //configurando a Sessão de acordo com o data do user recebido
    async function configSession(userFirebase: FirebaseUser | null){     
        if(userFirebase?.email){      
            const userLogged = await normalizeUser(userFirebase)
            setUser(userLogged)
            handleCookie(true)
            setUserLogged(true)
            setLoading(false)
            return userLogged.email //será usado para detectar quando o usuario mudou
        }else{
            setUser(null)
            handleCookie(false)           
            setLoading(false)
            return false
        }
    }

    const loginGoogle = async() =>{              
        try{
            const provider = new GoogleAuthProvider()   
            const res_firebase = await signInWithPopup(auth, provider);
            setLoading(true);
            await configSession(res_firebase.user) 
            setUserLogged(true)
        } finally {
            setLoading(false)
        }           
    }

    //login normal with email and password
    async function loginNormal(email: string, password: string){ 
        try{
            setLoading(true)
            const res_firebase = await signInWithEmailAndPassword(auth, email, password)
            await configSession(res_firebase.user)                 
            setUserLogged(true)
        }catch(err){
            if (err instanceof Error) setMsgError(err.message);
            else setMsgError('Unknow Error')          
        } finally {
            setLoading(false)
        }           
    }


     //função para registrar novo user com email e senha
     async function registerUser(email: string, password: string, confirmPassword: string){ 
        if(confirmPassword === password){
            try{
                setLoading(true)
                const res_firebase = await createUserWithEmailAndPassword(auth, email, password)                 
                const res_api = await UsersService.saveDataUser(res_firebase.user);
                if(res_api === correctStatusResponse) {                  
                    await configSession(res_firebase.user)
                    setUserLogged(true)  
                }                                         
            }catch(err){
                if (err instanceof Error) setMsgError(err.message);
                else setMsgError('Unknow Error')          
            }
            finally { 
                setLoading(false) 
            }          
        }else{ setMsgError('Repita as senhas corretamente')}            
    }

    async function logout(){
        try{
            setLoading(true)
            await signOut(auth);
            await configSession(null) // limpa as info do user
            setUserLogged(false)
        } finally{
            setLoading(false)
        }        
    }

    async function updateUser(user: UserLogin){
        const res_api = await UsersService.getDataUser(user.email)  
        user.imgUrl = res_api.avatar;
        setUser(user)
    }

    async function forgotPassword(email: string){
        //redefinir Senha
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Email para redefinição de senha enviado. Verifique sua caixa de e-mail e Spam.')
        })
        .catch((error) => {
            alert('Não existe nenhuma conta criada neste e-mail. Insira um e-mail válido. ')
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    useEffect(() =>{
        //esse metodo vai checar se ja existe um usuário mudou, em relaçaõ ao q estava logado antes
        //se tiver mudado ele chama a config session para passar os dados dnv(do user q logou a 1 vez)
        setLoading(true)
        if(Cookies.get('dio-ecommerce-cod3r-auth')){ //ter ctz q ja logou em algum momento
            const cancel = onIdTokenChanged(auth, configSession)
            return () => cancel() //quando componente for desmontado ele para de observar se mudou id /\
        }
        else setLoading(false)    
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            userLogged,
            loading,
            msgError,
            loginNormal,
            loginGoogle,
            logout,
            registerUser,
            updateUser,
            forgotPassword,
        }}>
            {props.children}
        </AuthContext.Provider  >
    )
}

export default AuthContext;