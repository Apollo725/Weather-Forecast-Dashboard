import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import Loader from 'react-loader';
import styled from 'styled-components';
import { Card } from '../../../components/Card';
import Button from '../../../components/CustomButton';
import { forgotPassword } from '../../../actions/authActions';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      email: '',
      editState: false,
      emailValid: true,
      resendState: false,
      forgotPasswordResult: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ cardHidden: false });
    }, 700);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.forgotPasswordResult !== nextProps.forgotPasswordResult) {
      // console.log('-------forgot Password', nextProps.forgotPasswordResult);
      this.setState({ forgotPasswordResult: nextProps.forgotPasswordResult });
    }
  }

  handleChange(e) {
    this.setState({
      email: e.target.value,
      emailValid: EmailValidator.validate(e.target.value),
      editState: true,
    });
  }

  handleClick(e) {
    if (e.target.name === 'sendRequest') {
      const { email, emailValid } = this.state;
      if (emailValid) {
        this.props.forgotPassword(email);
        this.setState({ email: '' });
      }
      this.setState({ editState: false, resendState: true });
    }
    if (e.target.name === 'backToLogin') {
      this.props.history.replace('/auth/login-page');
      // scheme to initailzie forgotPasswordResult(OK) store data
      window.location.reload();
    }
  }

  render() {
    const { isFetching } = this.props;
    const { editState, emailValid, email, resendState, forgotPasswordResult } = this.state;
    console.log('render fogotPasswordResult', forgotPasswordResult);
    return (
      <div>
        <Loader loaded={!isFetching} color="#fff">
          <Grid>
            <Row>
              <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                <form>
                  <Card
                    hidden={this.state.cardHidden}
                    textCenter
                    title="Recover Your Account"
                    content={
                      <div>
                        <FormGroup validationState={emailValid ? null : 'error'}>
                          {forgotPasswordResult === 'OK' &&
                            !editState && (
                              <CustomAlert bsStyle="success">
                                New password been sent into email!
                              </CustomAlert>
                            )}
                          {forgotPasswordResult === 'ERROR' && (
                            <CustomAlert bsStyle="warning">
                              Your account doesn&#39;t exist!
                            </CustomAlert>
                          )}
                          <ControlLabel>Email address</ControlLabel>
                          <FormControl
                            placeholder="Enter email"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                          />
                          {!emailValid && (
                            <CustomControlLabel>Invalid email address</CustomControlLabel>
                          )}
                        </FormGroup>
                      </div>
                    }
                    legend={
                      <div>
                        <Button
                          bsStyle="info"
                          fill
                          wd
                          name="sendRequest"
                          onClick={this.handleClick}
                        >
                          {resendState ? 'Resend Request' : 'Send Request'}
                        </Button>
                        <br />
                        <br />
                        {forgotPasswordResult === 'OK' &&
                          !editState && (
                            <Button
                              bsStyle="success"
                              fill
                              wd
                              name="backToLogin"
                              onClick={this.handleClick}
                            >
                              Back to login
                            </Button>
                          )}
                      </div>
                    }
                    ftTextCenter
                  />
                </form>
              </Col>
            </Row>
          </Grid>
        </Loader>
      </div>
    );
  }
}

const CustomAlert = styled(Alert)`
  height: 34px;
  line-height: 16px;
  font-size: 15px !important;
  text-align: center;
`;
const CustomControlLabel = styled(ControlLabel)`
  color: red !important;
`;

function mapStateToProps(state) {
  return {
    isFetching: state.authReducer.isFetching,
    forgotPasswordResult: state.authReducer.forgotPasswordResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: bindActionCreators(forgotPassword, dispatch),
  };
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
