import {useNavigate} from 'react-router-dom'

import styles from './cardItem.module.scss';
import useAuth from '../../data/hooks/useAuth';
import * as UsersService from '../../services/user.services';
import * as icon from '../icons/index';
import SuccessAlert from '../alert/succesAlert';
import userEvent from '@testing-library/user-event';

interface propsProduct{
    id: number,
    name: string,
    price: number,
    image: string,
    size: string
}

const CardItem = (props: propsProduct) =>{
    const navigate = useNavigate();
    const { userLogged, user } = useAuth();

    const handleAddProduct = (product_id: number) =>{
        if(!userLogged){
            alert('Necessário fazer login')
            navigate('/authentication');
        }
           //const res = UsersService.AddProduct(user?.uid, product_id );
           //if(res === 201) alert('Produto cadastrado')

    }

    return (
        <div className={styles.Content}>
            <img src={props.image} alt="Imagem do produto"/>
            <div className={styles.ContentInfo}>
                <a onClick={() => navigate(`/showProduct/${props.id}`)}>{props.name}</a>
                <div className={styles.RowInfo}>
                    <div className={styles.Info}> Preço: </div> 
                    <div className={styles.InfoValue}> ${props.price} </div>
                </div>
                <div className={styles.RowInfo}>
                    <div className={styles.Info}> Tamanho: </div> 
                    <div className={styles.InfoValue}> {props.size} </div>
                </div>
                <button className={styles.ContentButton} onClick={() => handleAddProduct(props.id)}>
                    Adicionar
                </button>
            </div>
        </div>
    )
}


export default CardItem;