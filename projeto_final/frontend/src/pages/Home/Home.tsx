import { ChangeEvent, useEffect, useState } from "react";


import Layout from "../../components/layout/layout";
import styles from './Home.module.scss';
import * as icon from '../../components/icons/index'
import CardItem from "../../components/cardItem/cardItem";
import * as ProductService from '../../services/product.services';
import {IProduct} from '../../services/interfaces/product.interface';



const Home = () =>{
    const [search, setSearch] = useState<string>('')
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() =>{
        async function getProducts(){
            const response: IProduct[] = await ProductService.getAllProducts();
            setProducts(response)           
        }
        getProducts()
    }, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setSearch(e.target.value)
    }

    const searchVehicle = (search: string) =>{
        console.log('search', search)
    }

    return(
        <Layout>
            <div className={styles.Content}>
                <div className={styles.SearchContent}>
                    <input 
                        placeholder='Digite o nome do produto que deseja'
                        type="text"
                        value={search}
                        onChange={handleSearchChange}        
                    />

                    <button onClick={() => searchVehicle(search)}>
                        <i>{icon.search}</i>
                    </button>
                </div>

                <div className={styles.RenderContent}>
                    {products.map((product, key) =>(
                        <CardItem
                            key={key}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            size={product.size}
                        />
                    ))}              
                </div>
            </div>
        </Layout>
    )
}

export default Home;