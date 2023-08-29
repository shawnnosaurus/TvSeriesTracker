import { Outlet, Navigate } from 'react-router-dom'

import useStore from '../hooks/stateStore';

const PrivateRoutes = ({ location }) => {
    const userAccount = useStore((state) => state.userAccount);
    return (
        userAccount?.token ? <Outlet /> : <Navigate to={{ pathname: '/account/login', state: { redirect: location } }} />
    );
};

export { PrivateRoutes };