import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signOut} from 'firebase/auth';
import { createContext, useEffect, useState, useContext } from "react";
import Cookies from 'js-cookie';

import User from '../model/User';
import { auth} from '../firebase/config'




interface AuthContextProps{
    user?: User | null,
    userLogged?: boolean, 
    loginGoogle?: () => Promise<void>,
    logoutGoogle?: () => Promise<void>,
}

const AuthContext= createContext<AuthContextProps>({    
})


//deixando os dados da forma como a gente quer receber
async function normalizeUser(userFirebase: FirebaseUser): Promise<User>{
    const token = await userFirebase.getIdToken() // espera pegar o token

    if(userFirebase.displayName && userFirebase.email && userFirebase.photoURL){
        return {
            uid: userFirebase.uid,
            name: userFirebase?.displayName,
            email: userFirebase.email,
            token,
            provider: userFirebase.providerData[0].providerId,
            imgUrl: userFirebase.photoURL
        }
    }
    else { return {uid: '', name: '', email: '', token: '', provider: '', imgUrl: ''}}
}


// salvando os dados do usuário em um cookie para nao perde-los no refresh da page...
function handleCookie(logged: boolean){
    if(logged){
        Cookies.set('dio-ecommerce-cod3r-auth', 'logged', {
            expires: 7 // os dados vão durar 7 dias
        })
    }
    else{
        Cookies.remove('dio-ecommerce-cod3r-auth') // se tiver deslogado, exclui os dados
    }
}


export const AuthProvider = (props:any) =>{
    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null)

    const provider = new GoogleAuthProvider()


    async function configSession(userFirebase: FirebaseUser | null){     
        if(userFirebase?.email){ 
            const userLogged = await normalizeUser(userFirebase)
            setUser(userLogged) 
            handleCookie(true)
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
            setLoading(true)
            const resp = await signInWithPopup(auth, provider)
            await configSession(resp.user) 
            setUserLogged(true)
        } finally {
            setLoading(false)
        }           
    }

    async function logoutGoogle(){
        try{
            setLoading(true)
            await signOut(auth);
            //await firebase.auth().signOut();
            await configSession(null) // limpa as info do user
            setUserLogged(false)
        } finally{
            setLoading(false)
        }        
    }


    return (
        <AuthContext.Provider value={{
            user,
            userLogged,
            loginGoogle,
            logoutGoogle,
        }}>
            {props.children}
        </AuthContext.Provider  >
    )
}

export default AuthContext;