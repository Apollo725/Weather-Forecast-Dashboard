import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import DashboardRoute from '../../routes/DashboardRoute';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universeName: '',
    };
  }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.replace('/auth/login-page');
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('-------dashboar will receive props', nextProps);
    if (nextProps.authData.universeName) {
      this.setState({ universeName: nextProps.authData.universeName });
    }
  }

  render() {
    const { isFetching } = this.props;
    // const { universeName } = this.state.universeName;
    // console.log('-------authData', authData);
    return (
      <div className="wrapper">
        <Loader loaded={!isFetching}>
          <NotificationSystem ref="notificationSystem" />
          <Sidebar {...this.props} />
          <div
            className={
              'main-panel' +
              (this.props.location.pathname === '/maps/full-screen-maps' ? ' main-panel-maps' : '')
            }
            ref="mainPanel"
          >
            <Header {...this.props} universeName={this.state.universeName} />
            <DashboardRoute />
            <Footer fluid />
          </div>
        </Loader>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.authReducer.isFetching,
    authData: state.authReducer.authData,
  };
}

Dashboard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  authData: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Dashboard);
