import { useParams } from 'react-router-dom';

import styles from './ShowProduct.module.scss';
import * as icon from '../../components/icons/index';
import Layout from '../../components/layout/layout';
import { useEffect } from 'react';

const ShowProduct = () =>{

    const params = useParams()

    useEffect(() =>{
        console.log('lookparams', params.id)
    }, [])

    return(
        <Layout>
            <div className={styles.Content}>
                <img src="https://1.bp.blogspot.com/-sfmZsY8J-SQ/YTfuPgFU4nI/AAAAAAAAYX0/vrCsfHkwQ8Q7PMBvw0frKHz2P15EpWl0wCLcBGAsYHQ/s280/Vera%2BCruz%2BPE%2B2021%2B2.png" alt="Imagem do produto"/>
                <div className={styles.ContentInfo}>
                    <h1>Camisa Vera Cruz</h1>

                    <div className={styles.RowInfo}>
                        <div className={styles.Info}> Preço: </div> 
                        <div className={styles.InfoValue}> $205</div>
                    </div>

                    <div className={styles.RowInfo}>
                        <div className={styles.Info}> Quantidade: </div> 
                        <div className={styles.InfoValue}> 5 </div>
                    </div>

                    <div className={styles.RowInfo}>
                        <div className={styles.Info}> Tamanho: </div> 
                        <div className={styles.InfoValue}> M </div>
                    </div>

                    <div className={styles.Info}> Calcule o valor do frete:</div>
                    <div className={styles.CalcCep}>
                        <input
                          placeholder='Insira seu CEP'  
                        />
                        <button className={styles.ButtonSearchCEP}>
                            {icon.search}
                        </button>
                    </div>
                    
                    <button className={styles.FinishShop}>
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default ShowProduct;