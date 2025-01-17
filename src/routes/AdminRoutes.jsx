import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/LoadingPage/Loading';
import useAdmin from '../hooks/useAdmin';

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [isAdmin,isAdminPending] = useAdmin();
    const location = useLocation();
    if(loading || isAdminPending){
       return <Loading></Loading>
    }
    if(user && isAdmin){
       return children;
    }
   
       return <Navigate to={"/login"} state={{form:location}} replace></Navigate>
   }; 

export default AdminRoutes;