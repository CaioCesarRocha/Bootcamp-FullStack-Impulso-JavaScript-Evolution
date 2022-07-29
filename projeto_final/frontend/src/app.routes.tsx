import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import ShowProduct from './pages/ShowProduct/ShowProduct';



const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" />
                <Route element={<CreateProduct/>} path="/CreateProduct" />
                <Route element={<UpdateProduct/>} path="/UpdateProduct/:id"/> 
                <Route element={<ShowProduct/>} path="/ShowProduct/:id" />        
            </Routes>         
        </BrowserRouter>
    )
}

export default AppRoutes;