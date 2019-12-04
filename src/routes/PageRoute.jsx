import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../utils/helpers/historyHelper';
import Dashboard from '../pages/Dashboard';
import Auth from '../pages/Auth';
import Blog from '../containers/others/Blog';
import Services from '../containers/others/Services';
import AboutUs from '../containers/others/AboutUs';

class PageRouteConfig extends React.Component {
  render() {
    const { auth } = this.props;
    console.log('login auth', auth);
    const rootComponent = (
      <Redirect to={auth.isAuthenticated === true ? '/dashboard' : '/auth/login-page'} />
    );
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => rootComponent} />
          <Route path="/auth" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/about_us" component={AboutUs} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.authReducer };
}

PageRouteConfig.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PageRouteConfig);
