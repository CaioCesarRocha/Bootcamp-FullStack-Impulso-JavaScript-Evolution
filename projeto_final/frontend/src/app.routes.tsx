import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';
import Perfil from './pages/Perfil/perfil';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import ShowProduct from './pages/ShowProduct/ShowProduct';



const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" />
                <Route element={<Perfil/>} path="/Perfil" />
                <Route element={<Authentication/>} path="/Authentication" />
                <Route element={<CreateProduct/>} path="/CreateProduct" />
                <Route element={<UpdateProduct/>} path="/UpdateProduct/:id"/> 
                <Route element={<ShowProduct/>} path="/ShowProduct/:id" />        
            </Routes>         
        </BrowserRouter>
    )
}

export default AppRoutes;