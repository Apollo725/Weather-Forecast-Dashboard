import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import styled from 'styled-components';
import Card from '../../../components/Card/Card';
import Button from '../../../components/CustomButton/CustomButton';
import { contactSubmit } from '../../../actions/dashboardAction';
import NotificationModal from '../../../components/Modal';

class GetHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      content: '',
      emailValid: true,
      emailEmpty: false,
      subjectEmpty: false,
      contentEmpty: false,
      modalShow: false,
      submitButtonClicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactResult === 'OK') {
      console.log('forceupdate!!!!!!!!!');
      this.forceUpdate();
      this.setState({ state: this.state });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      this.setState({ emailValid: EmailValidator.validate(e.target.value) });
    }
  }

  handleClick() {
    const { email, subject, content, emailValid } = this.state;
    const params = { email, subject, content };
    if (emailValid && email && subject && content) {
      this.props.contactSubmit(params);
      this.setState({
        modalShow: true,
        email: '',
        subject: '',
        content: '',
      });
    }
    if (!email) {
      this.setState({ emailEmpty: true });
    }
    if (!subject) {
      this.setState({ subjectEmpty: true });
    }
    if (!content) {
      this.setState({ contentEmpty: true });
    }
  }

  render() {
    const {
      emailValid,
      emailEmpty,
      subjectEmpty,
      contentEmpty,
      modalShow,
      email,
      subject,
      content,
    } = this.state;
    const modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="main-content">
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Card
              title="Contact Us"
              content={
                <form>
                  <FormGroup validationState={emailValid ? null : 'error'}>
                    <ControlLabel>Email address*</ControlLabel>
                    <FormControl
                      placeholder="Enter email"
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      value={email}
                    />
                    {!emailValid && <CustomControlLabel>Invalid email address</CustomControlLabel>}
                    {emailEmpty && <CustomControlLabel>This can not be empty</CustomControlLabel>}
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Subject*</ControlLabel>
                    <FormControl
                      placeholder="Subject"
                      type="text"
                      name="subject"
                      onChange={this.handleChange}
                      value={subject}
                    />
                    {subjectEmpty && <CustomControlLabel>This can not be empty</CustomControlLabel>}
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Content*</ControlLabel>
                    <FormControl
                      placeholder="Content"
                      componentClass="textarea"
                      name="content"
                      onChange={this.handleChange}
                      value={content}
                    />
                    {contentEmpty && <CustomControlLabel>This can not be empty</CustomControlLabel>}
                  </FormGroup>
                  <Button bsStyle="info" fill onClick={this.handleClick}>
                    Submit
                  </Button>
                </form>
              }
            />
          </Col>
          <Col md={3} />
        </Row>
        <NotificationModal
          show={modalShow}
          onHide={modalClose}
          content="Your request has been sent successfully!"
        />
      </div>
    );
  }
}

const CustomControlLabel = styled(ControlLabel)`
  color: red !important;
`;

function mapStateToProps(state) {
  return {
    contactResult: state.dashboardReducer.contactResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contactSubmit: bindActionCreators(contactSubmit, dispatch),
  };
}

GetHelp.propTypes = {
  contactSubmit: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetHelp);
