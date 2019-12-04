import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../actions/authActions';

class HeaderLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logoutClick = this.logoutClick.bind(this);
    this.profileClick = this.profileClick.bind(this);
  }

  logoutClick() {
    this.props.logoutAction();
  }

  profileClick() {
    this.props.getProfileAction();
  }

  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem
            eventKey={3}
            componentClass={Link}
            to="/dashboard/getHelp"
            href="/dashboard/getHelp"
          >
            <i className="ti-email" />
            <p>Get Help</p>
          </NavItem>
          <NavItem
            eventKey={3}
            componentClass={Link}
            to="/dashboard/profile"
            href="/dashboard/profile"
          >
            <i className="ti-home" />
            <p>My Profile</p>
          </NavItem>
          <NavItem eventKey={3} href="#" onClick={this.logoutClick}>
            <i className="ti-lock" />
            <p>Logout</p>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch),
  };
}
HeaderLinks.propTypes = {
  logoutAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(HeaderLinks);
