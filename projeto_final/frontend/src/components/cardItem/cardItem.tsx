import {useNavigate} from 'react-router-dom'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import styles from './cardItem.module.scss';
import useAuth from '../../data/hooks/useAuth';
import { addProductList, removeProductList } from '../../redux/reducers/productsReducer';
import * as UsersService from '../../services/user.services';
import * as ProductsService from '../../services/product.services';
import * as icon from '../icons/index';
import Alert from '../alerts/alert'
import { useState } from 'react';


interface propsProduct{
    id: number,
    name: string,
    price: number,
    image: string,
    size: string,
    infoButton?: string,
    colorButton?: string;
}

const CardItem = (props: propsProduct) =>{
    const [shouldDelete, setShouldDelete] = useState<boolean>(false)
    const navigate = useNavigate();
    const removeProductDispatch = useDispatch();
    const { userLogged, user } = useAuth();


    const handleProduct = async(product_id: number) =>{
        if(userLogged && user?.uid && props.infoButton === 'Adicionar'){
            const res = await UsersService.addProduct(user?.uid, product_id );
            if(res === 201) {
                const product = {id: props.id, name: props.name, price: props.price, image: props.image, size: props.size}
                const sendingProducts = (product: propsProduct) => removeProductDispatch(addProductList(product))           
                sendingProducts(product)
            } toast.success('Produto Adicionado no carrinho.');                          
        }
        else if(userLogged && user?.uid && props.infoButton === 'Remover da Lista'){
            const res: boolean = await UsersService.removeProduct(user?.uid, product_id )
            if(res){
                const sendingProducts = (product_id: number) => removeProductDispatch(removeProductList(product_id))           
                sendingProducts(product_id)

                toast.success('Produto removido carrinho.');            
            }
        }else{
            await toast.warn('Necessário fazer login');
            navigate('/authentication');
        }
    }

    const handleDeleteProduct = async(id: number) =>{
        setShouldDelete(true)
        if(shouldDelete){
            const res: boolean = await ProductsService.deleteProduct(id)

            if(res)    await toast.success('Produto deletado com sucesso');
            else   toast.error('não foi possivel concluir a operação');
        }
        return null;
    }

    return (
        <div className={styles.Content}>
            <Alert theme='colored'/> 
            <img src={props.image} alt="Imagem do produto"/>
            <div className={styles.ContentInfo}>
                {user?.isAdmin ? 
                    <div className={styles.ContainerOptions}>
                        <a href="#/" onClick={() => navigate(`/UpdateProduct/${props.id}`)}>{icon.edit}</a>
                        {!shouldDelete ? 
                            <a href="#/" onClick={() => handleDeleteProduct(props.id)}>{icon.exclude}</a>   
                        :
                            <a href="#/" onClick={() => handleDeleteProduct(props.id)} style={{color: 'orange'}}>
                                {icon.attention}
                            </a>   
                        }                              
                    </div>
                :   null             
                }

                <a href="#/"onClick={() => navigate(`/showProduct/${props.id}`)}>{props.name}</a>
                <div className={styles.RowInfo}>
                    <div className={styles.Info}> Preço: </div> 
                    <div className={styles.InfoValue}> ${props.price} </div>
                </div>
                <div className={styles.RowInfo}>
                    <div className={styles.Info}> Tamanho: </div> 
                    <div className={styles.InfoValue}> {props.size} </div>
                </div>
                <button 
                    style={{backgroundColor: props.colorButton}}
                    className={styles.ContentButton} 
                    onClick={() => handleProduct(props.id)}             
                >
                    {props.infoButton}
                </button>
            </div>
        </div>
    )
}


export default CardItem;