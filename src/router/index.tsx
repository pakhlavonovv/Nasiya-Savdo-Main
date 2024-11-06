import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
 } from "react-router-dom";
 import App from "../App";
import { SignIn, SignUp, Product, Contract, Exchange } from "../modules";
import AdminLayout from '../modules/admin-layout/pages'

 const Index = () => {
    const router = createBrowserRouter(
       createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="admin-layout" element={<AdminLayout/>}>
            <Route index element={<Product/>}/>
            <Route path="contract" element={<Contract/>}/>
            <Route path="exchange" element={<Exchange/>}/>
            </Route>
          </Route> 
       )
    );
 
    return <RouterProvider router={router} />;
 };
 
 export default Index;