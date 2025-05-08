import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AuthenticatedRoute (children) {
    const { isAuthenticated }  = useSelector(state => state.auth);
    const location = useLocation();

    if(!isAuthenticated){
        return <Navigate to="/" replace state={{from:location}} />
    }

    return(
        <main>
            <div>
                <Outlet />
            </div>
        </main>
    );
}
