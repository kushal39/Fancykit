
import { useSelector } from 'react-redux'
import { Redirect,Route } from 'react-router-dom';

const ProtectedRoute = ({isAdmin, component: Component, ...rest}) => {
    const token = localStorage.getItem('token');


    const {loading, isAuthenticated, user} = useSelector((state) => state.user);

    return (
       <>
       
        
            {typeof token != 'undefined' ? (
            <Route 
            {...rest}
            render={
                (props) => {
                    if(isAuthenticated === false){
                        return <Redirect to="/login" />
                    }
                    if(isAdmin === true && user.role !=="admin"){
                        return  <Redirect to="/login" />
                    }
                    return <Component {...props} />;
                }
            }
            />
            ) : (
                <Redirect to={'/'} />
              )}
        
       
       </>
    )
}

export default ProtectedRoute
