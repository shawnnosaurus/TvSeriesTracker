import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import WebApiClient from '../../services/webApiClient';
import useStore from '../../hooks/stateStore';
import './styles.css';

const NavMenu = () => {
    const userAccount = useStore((state) => state.userAccount);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">TV Series Tracker</NavbarBrand>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                        </NavItem>
                        {userAccount?.token && (
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/series">TV Shows</NavLink>
                            </NavItem>
                        )}
                        <NavItem>
                            {userAccount?.token ? (
                                <NavLink tag={Link} className="text-dark" onClick={WebApiClient.userLogout}>Logout</NavLink>
                            ) : (
                                <NavLink tag={Link} className="text-dark" to="/account/login">Login</NavLink>
                            )}
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export { NavMenu };
