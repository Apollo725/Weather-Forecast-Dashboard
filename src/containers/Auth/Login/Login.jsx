import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Loader from 'react-loader';
import { loginAction } from '../../../actions/authActions';
import { Card } from '../../../components/Card';
import Button from '../../../components/CustomButton';
import Checkbox from '../../../components/CustomCheckbox';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      data: {
        email: '',
        password: '',
      },
      emailNull: false,
      passwordNull: false,
      authError: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.props.history.replace('/dashboard');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardHidden: false });
    }, 700);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errorMessage !== this.props.auth.errorMessage) {
      this.setState({ authError: !!nextProps.auth.errorMessage });
    }
  }

  handleLogin() {
    const { data } = this.state;
    if (data.email === '') {
      this.setState({ emailNull: true, authError: false });
    } else if (data.password === '') {
      this.setState({ passwordNull: true, authError: false });
    } else {
      this.props.loginAction(data, this.props.router);
    }
  }

  handleEmail(e) {
    if (e.target.value) this.setState({ emailNull: false, authError: false });
    const data = { ...this.state.data };
    data.email = e.target.value;
    this.setState({ data });
  }

  handlePassword(e) {
    if (e.target.value) this.setState({ passwordNull: false, authError: false });
    const data = { ...this.state.data };
    data.password = e.target.value;
    this.setState({ data });
  }

  render() {
    const { emailNull, passwordNull, authError } = this.state;
    const { isFetching } = this.props.auth;
    return (
      <Loader loaded={!isFetching} color="#fff">
        <Grid>
          <Row>
            <Col md={4} sm={6} mdOffset={4} smOffset={3}>
              <form>
                <Card
                  hidden={this.state.cardHidden}
                  textCenter
                  title="Login"
                  content={
                    <div>
                      <FormGroup>
                        {authError && (
                          <CustomAlert bsStyle="danger">
                            Email and Password is not correct!
                          </CustomAlert>
                        )}
                        <ControlLabel>Email address</ControlLabel>
                        {emailNull && (
                          <CustomAlert bsStyle="warning">Please fill in Email!</CustomAlert>
                        )}
                        <FormControl
                          placeholder="Enter email"
                          type="email"
                          onChange={this.handleEmail}
                        />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        {passwordNull && (
                          <CustomAlert bsStyle="warning">Please fill in Password!</CustomAlert>
                        )}
                        <FormControl
                          placeholder="Password"
                          type="password"
                          onChange={this.handlePassword}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Checkbox number="1" label="Remember Me" />
                        <Link to="/auth/forgot-password">Forgot Password?</Link>
                      </FormGroup>
                    </div>
                  }
                  legend={
                    <Button bsStyle="info" fill wd onClick={this.handleLogin}>
                      Login
                    </Button>
                  }
                  ftTextCenter
                />
              </form>
            </Col>
          </Row>
        </Grid>
      </Loader>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
  };
}

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

const CustomAlert = styled(Alert)`
  height: 34px;
  line-height: 16px;
  font-size: 12px !important;
  text-align: ${props => (props.bsStyle === 'danger' ? 'center' : 'left')};
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginPage),
);
