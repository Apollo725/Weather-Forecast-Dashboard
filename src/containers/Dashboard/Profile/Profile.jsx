import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import * as EmailValidator from 'email-validator';
import Card from '../../../components/Card/Card';
import FormInputs from '../../../components/FormInputs';
import UserCard from '../../../components/Card/UserCard';
import Button from '../../../components/CustomButton';
import avatar from '../../../assets/img/Apollo725-avatar.png';
import { getProfileAction, updateProfileAction } from '../../../actions/dashboardAction';
import NotificationModal from '../../../components/Modal';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      emailValid: false,
      modalShow: false,
      updateButtonClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfileAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileData !== this.props.profileData) {
      const { profileData } = nextProps;
      this.setState({
        email: profileData.email,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        address: profileData.address,
        city: profileData.city,
        country: profileData.country,
        postalCode: profileData.post_code,
        emailValid: true,
      });
    }
    console.log('will receive props', nextProps);
    if (nextProps.updateProfileResult === 'OK' && this.state.updateButtonClicked === true) {
      this.setState({ modalShow: true, updateButtonClicked: false });
    }
  }

  handleChange(e) {
    console.log('target', e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      this.setState({ emailValid: EmailValidator.validate(e.target.value) });
    }
  }

  handleClick() {
    const {
      emailValid,
      email,
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode,
    } = this.state;
    if (emailValid && email && firstName && lastName && address && city && country && postalCode) {
      console.log('update clicking', this.state.email);
      // const { userId, locked, clientId, clientTeamId, universeId } = this.props.profileData;
      const params = {
        firstName,
        lastName,
        email,
        address,
        city,
        country,
        postalCode,
      };
      this.props.updateProfileAction(params);
      this.setState({ updateButtonClicked: true });
    }
  }

  render() {
    const { profileData, isFetching } = this.props;
    const { modalShow } = this.state;
    const modalClose = () => this.setState({ modalShow: false });
    const {
      emailValid,
      email,
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode,
    } = this.state;
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={4}>
                <UserCard
                  bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                  avatar={avatar}
                  name={firstName + ' ' + lastName}
                  description={<span>Weather Enthusiast</span>}
                />
                <Card
                  title="Subscription Plan"
                  content={
                    <CustomSpan>
                      Level3,
                      <br />
                      billed
                      <br />
                      monthly
                    </CustomSpan>
                  }
                />
              </Col>
              <Col md={8}>
                <Card
                  title="My Profile"
                  content={
                    <form>
                      <FormInputs
                        ncols={['col-md-5']}
                        proprieties={[
                          {
                            label: 'Company',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'Company',
                            defaultValue: profileData.company_name,
                            disabled: true,
                          },
                        ]}
                      />

                      <FormInputs
                        ncols={['col-md-6']}
                        proprieties={[
                          {
                            label: 'Email Address',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'Email',
                            defaultValue: email,
                            name: 'email',
                            onChange: this.handleChange,
                            empty: email ? null : 'true',
                            valid: emailValid ? null : 'true',
                          },
                        ]}
                      />
                      <FormInputs
                        ncols={['col-md-6', 'col-md-6']}
                        proprieties={[
                          {
                            label: 'First Name',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'First name',
                            defaultValue: firstName,
                            name: 'firstName',
                            onChange: this.handleChange,
                            empty: firstName ? null : 'true',
                          },
                          {
                            label: 'Last Name',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'Last name',
                            defaultValue: lastName,
                            name: 'lastName',
                            onChange: this.handleChange,
                            empty: lastName ? null : 'true',
                          },
                        ]}
                      />
                      <FormInputs
                        ncols={['col-md-6']}
                        proprieties={[
                          {
                            label: 'Address',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'address',
                            defaultValue: address,
                            name: 'address',
                            onChange: this.handleChange,
                            empty: address ? null : 'true',
                          },
                        ]}
                      />
                      <FormInputs
                        ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                        proprieties={[
                          {
                            label: 'City',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'City',
                            defaultValue: city,
                            name: 'city',
                            onChange: this.handleChange,
                            empty: city ? null : 'true',
                          },
                          {
                            label: 'Country',
                            type: 'text',
                            bsClass: 'form-control',
                            placeholder: 'Country',
                            defaultValue: country,
                            name: 'country',
                            onChange: this.handleChange,
                            empty: country ? null : 'true',
                          },
                          {
                            label: 'Postal Code',
                            type: 'number',
                            bsClass: 'form-control',
                            placeholder: 'ZIP Code',
                            defaultValue: postalCode,
                            name: 'postalCode',
                            onChange: this.handleChange,
                            empty: postalCode ? null : 'true',
                          },
                        ]}
                      />
                      <CustomDiv>
                        <Button bsStyle="info" round fill onClick={this.handleClick}>
                          Update Profile
                        </Button>
                      </CustomDiv>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
            <NotificationModal
              show={modalShow}
              onHide={modalClose}
              content="Your profile had been updated successfully!"
            />
          </Grid>
        </Loader>
      </div>
    );
  }
}

const CustomSpan = styled.span`
  font-size: 18px;
`;
const CustomDiv = styled.div`
  text-align: center;
`;

function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    profileData: state.dashboardReducer.profileData,
    updateProfileResult: state.dashboardReducer.updateProfileResult,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getProfileAction: bindActionCreators(getProfileAction, dispatch),
    updateProfileAction: bindActionCreators(updateProfileAction, dispatch),
  };
}

Profile.propTypes = {
  profileData: PropTypes.object.isRequired,
  getProfileAction: PropTypes.func.isRequired,
  updateProfileAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
