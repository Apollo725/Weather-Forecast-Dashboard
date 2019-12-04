import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactHTMLParser from 'react-html-parser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRegulation } from '../../../actions/dashboardAction';

import Card from '../../../components/Card/Card';

class Regulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.props.getRegulation();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.regulation !== nextProps.regulation) {
      this.setState({ data: nextProps.regulation });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title="Regulation" content={ReactHTMLParser(data.content)} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    regulation: state.dashboardReducer.regulation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRegulation: bindActionCreators(getRegulation, dispatch),
  };
}

Regulation.propTypes = {
  regulation: PropTypes.object,
  getRegulation: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Regulation);
