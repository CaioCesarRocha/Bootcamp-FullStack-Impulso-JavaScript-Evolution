import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import ShowProduct from './pages/ShowProduct/ShowProduct';



const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" />  
                <Route element={<ShowProduct/>} path="/ShowProduct/:id" />        
            </Routes>         
        </BrowserRouter>
    )
}

export default AppRoutes;