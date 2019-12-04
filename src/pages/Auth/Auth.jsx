import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from '../../components/Footer';
import { PagesHeader } from '../../components/Header';
// dinamically create auth routes
import authRouteHelper from '../../utils/helpers/authRouteHelper';

import bgImage from '../../assets/img/full-screen-image-3.jpg';

class Auth extends Component {
  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.replace('/auth/login-page');
    }
  }

  getPageClass() {
    let pageClass = '';
    switch (this.props.location.pathname) {
      case '/auth/login-page':
        pageClass = ' login-page';
        break;
      case '/auth/register-page':
        pageClass = ' register-page';
        break;
      case '/auth/lock-screen-page':
        pageClass = ' lock-page';
        break;
      case '/auth/forgot-password':
        pageClass = ' login-page';
        break;
      default:
        pageClass = '';
        break;
    }
    return pageClass;
  }

  render() {
    return (
      <div>
        <PagesHeader />
        <div className="wrapper wrapper-full-page">
          <div
            className={'full-page' + this.getPageClass()}
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Switch>
                {authRouteHelper.map((prop, key) => (
                  <Route path={prop.path} component={prop.component} key={key} />
                ))}
              </Switch>
            </div>
            <Footer transparent />
            <div
              className="full-page-background"
              style={{ backgroundImage: 'url(' + bgImage + ')' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
