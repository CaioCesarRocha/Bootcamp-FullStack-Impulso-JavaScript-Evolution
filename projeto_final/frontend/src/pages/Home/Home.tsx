import { ChangeEvent, useState } from "react";


import Layout from "../../components/layout/layout";
import styles from './Home.module.scss';
import * as icon from '../../components/icons/index'
import CardItem from "../../components/cardItem/cardItem";




const Home = () =>{
    const [search, setSearch] = useState<string>('')

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
                    <CardItem
                        id={1}
                        name="Camisa vera Cruz"
                        price={105}
                        image="https://1.bp.blogspot.com/-sfmZsY8J-SQ/YTfuPgFU4nI/AAAAAAAAYX0/vrCsfHkwQ8Q7PMBvw0frKHz2P15EpWl0wCLcBGAsYHQ/s280/Vera%2BCruz%2BPE%2B2021%2B2.png"
                        size="M"
                    />
                    <CardItem
                        id={1}
                        name="Camisa vera Cruz"
                        price={105}
                        image="https://1.bp.blogspot.com/-sfmZsY8J-SQ/YTfuPgFU4nI/AAAAAAAAYX0/vrCsfHkwQ8Q7PMBvw0frKHz2P15EpWl0wCLcBGAsYHQ/s280/Vera%2BCruz%2BPE%2B2021%2B2.png"
                        size="M"
                    />
                    <CardItem
                        id={1}
                        name="Camisa vera Cruz"
                        price={105}
                        image="https://1.bp.blogspot.com/-sfmZsY8J-SQ/YTfuPgFU4nI/AAAAAAAAYX0/vrCsfHkwQ8Q7PMBvw0frKHz2P15EpWl0wCLcBGAsYHQ/s280/Vera%2BCruz%2BPE%2B2021%2B2.png"
                        size="M"
                    />

                    <CardItem
                        id={1}
                        name="Camisa vera Internacional Veranopolis"
                        price={105}
                        image="https://1.bp.blogspot.com/-sfmZsY8J-SQ/YTfuPgFU4nI/AAAAAAAAYX0/vrCsfHkwQ8Q7PMBvw0frKHz2P15EpWl0wCLcBGAsYHQ/s280/Vera%2BCruz%2BPE%2B2021%2B2.png"
                        size="M"
                    />

                    <CardItem
                        id={1}
                        name="Camisa vera Cruz"
                        price={105}
                        image="https://1.bp.blogspot.com/-sfmZsY8J-SQ/YTfuPgFU4nI/AAAAAAAAYX0/vrCsfHkwQ8Q7PMBvw0frKHz2P15EpWl0wCLcBGAsYHQ/s280/Vera%2BCruz%2BPE%2B2021%2B2.png"
                        size="M"
                    />
                </div>
            </div>

       </Layout>
    )
}

export default Home;