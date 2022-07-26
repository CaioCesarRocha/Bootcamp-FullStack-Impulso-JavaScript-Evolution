import NavBar from "../navBar/navBar";
import styles from "./layout.module.scss";


interface PropsLayout{
    children?: any
}

const Layout = (props: PropsLayout) =>{
    return(
        <>
            <NavBar/>
            <div className={styles.Content}>
                {props.children}
            </div>
        </>

    )
}


export default Layout;