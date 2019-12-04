import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// links that appear in navbar - they are separated from this component (navbar) so that we can redner them on responsive in sidebar as well

import HeaderLinks from './HeaderLinks';

// we import here the routes for dashboard pages (links that appear in sidebar) to set navbar's name

import dashboardRouteHelper from '../../utils/helpers/dashboardSidebarRouteHelper';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universeName: '',
      companyName: 'Weather Inc',
    };
    this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      universeName: localStorage.getItem('universeName'),
      companyName: this.state.companyName,
    });
  }

  makeBrand() {
    // console.log('make brand', this.props.history);
    let name;
    dashboardRouteHelper.map(prop => {
      if (prop.collapse) {
        prop.views.map(prop => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else if (prop.redirect) {
        if (prop.path === this.props.location.pathname) {
          name = prop.name;
        }
      } else if (prop.path === this.props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    if (this.props.history.location.pathname === '/dashboard/profile') {
      name = 'My Profile';
    }
    return name;
  }

  // function that makes the sidebar from normal to mini and vice-versa
  handleMinimizeSidebar() {
    document.body.classList.toggle('sidebar-mini');
  }

  // function for responsive that hides/shows the sidebar
  mobileSidebarToggle() {
    document.documentElement.classList.toggle('nav-open');
  }

  render() {
    const { universeName, companyName } = this.state;
    return (
      <Navbar fluid>
        <div className="navbar-minimize">
          <button
            id="minimizeSidebar"
            className="btn btn-default btn-fill btn-round btn-icon"
            onClick={this.handleMinimizeSidebar}
          >
            <i className="fa fa-ellipsis-v visible-on-sidebar-regular" />
            <i className="fa fa-navicon visible-on-sidebar-mini" />
          </button>
        </div>
        <Navbar.Header>
          <Navbar.Brand>
            {/* Here we create navbar brand, based on route name */}
            <Link to="/">
              {companyName}- Universe {universeName}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>

        {/* Here we import the links that appear in navbar */}
        {window.innerWidth > 992 ? (
          <Navbar.Collapse>
            <HeaderLinks />
          </Navbar.Collapse>
        ) : null}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    // isFetching: state.authReducer.isFetching,
    authData: state.authReducer.authData,
  };
}

Header.propTypes = {
  // isFetching: PropTypes.bool.isRequired,
  // authData: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Header);
