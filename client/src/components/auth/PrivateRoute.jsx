
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
 
  const token=useSelector((state)=>state.auth.token);
  if(token==null){
    return <Navigate to="/login" replace />;
  }
  else{
     return children;
  }
}


export default PrivateRoute