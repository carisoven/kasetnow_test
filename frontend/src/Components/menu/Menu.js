import React, { Fragment, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Menu.css";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/action/auth";

// import Logo from "../menu/kasetnow-logo.png";

const Menu = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //Navbar not Login
  const authLinks = (
    <Fragment>
      <Nav className="mr-auto nav2" navbar>
        <Link to="/home">
          <NavItem>
            <NavLink>Home</NavLink>
          </NavItem>
        </Link>
        <Link to="/social">
          <NavItem>
            <NavLink>Social</NavLink>
          </NavItem>
        </Link>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink componentClass={Link} href="/" to="/" onClick={logout}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav className="mr-auto nav2" navbar>
        <Link to="/home">
        <NavItem>
          <NavLink>
            Home
          </NavLink>
        </NavItem>
        </Link>
        <Link to="/store">
        <NavItem>
          <NavLink>
            Store
          </NavLink>
        </NavItem>
        </Link>
      </Nav>
      {/* <Nav className="ml-auto" navbar>
        
      </Nav> */}
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar className="nav" light expand="md">
        <Link to="/home">
          <NavbarBrand>{/* <img src={Logo} alt="Logo" /> */}</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse className="" isOpen={isOpen} navbar>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};
Menu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Menu);
