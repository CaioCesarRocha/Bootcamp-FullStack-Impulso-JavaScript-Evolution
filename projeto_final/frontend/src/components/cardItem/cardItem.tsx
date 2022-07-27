import {useNavigate} from 'react-router-dom'

import styles from './cardItem.module.scss';
import * as icon from '../icons/index';

interface propsProduct{
    id: number,
    name: string,
    price: number,
    //quantity: number,
    image: string,
    size: string
}

const CardItem = (props: propsProduct) =>{
    const navigate = useNavigate();

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
                <button className={styles.ButtonAddCart}>
                    Adicionar
                    <i>{icon.shopCart}</i>
                </button>
            </div>
        </div>
    )
}


export default CardItem;