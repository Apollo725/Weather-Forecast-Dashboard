import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class PagesHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  // function that shows/hides sidebar on responsive
  mobileSidebarToggle() {
    document.documentElement.classList.toggle('nav-open');
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  // function that sets the class to active of the active page
  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }

  render() {
    return (
      <Navbar
        collapseOnSelect
        inverse
        className="navbar-primary navbar-transparent navbar-absolute"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/dashboard" className="nav-link">
              {this.state.width > 429 ? 'Weather' : 'Weather'}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav navbar-right">
            <li className={this.activeRoute('login-page')}>
              <NavLink to="/auth/login-page" className="nav-link">
                <i className="fas fa-drivers-license" />
                <p>Login</p>
              </NavLink>
            </li>
            <li className={this.activeRoute('register-page')}>
              <NavLink to="/auth/register-page" className="nav-link">
                <i className="fas fa-user-circle" />
                <p>Register</p>
              </NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default PagesHeader;
