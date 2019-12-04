import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import Card from '../../../components/Card/Card';
import { getKnowledgeDetails } from '../../../actions/dashboardAction';
import { makeKnowledgeDetailsColumns } from '../../../utils/const/tableColumns';
import { makeKnowledgeDetailsData } from '../../../utils/helpers/objectManageHelper';

class KnowledgeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      data: null,
    };
  }

  componentDidMount() {
    const { knowledgeId } = this.props.match.params;
    // console.log('knowledge details table', knowledgeId);
    this.props.getKnowledgeDetails(knowledgeId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.knowledgeDetails !== this.props.knowledgeDetails) {
      const { data, columns } = nextProps.knowledgeDetails;
      this.setState({
        columns: makeKnowledgeDetailsColumns(columns),
        data: makeKnowledgeDetailsData(data, columns),
      });
    }
    if (nextProps.match.params !== this.props.match.params) {
      const { knowledgeId } = nextProps.match.params;
      // console.log('knowledge details table', knowledgeId);
      this.props.getKnowledgeDetails(knowledgeId);
    }
  }

  render() {
    const { knowledgeDetails, isFetching } = this.props;
    console.log('render in knowledge details table', knowledgeDetails);
    const { data } = this.state;
    console.log('render in knowledge details table', data);
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title={
                    <div>
                      <h4>
                        knowledgeBase Name:&nbsp;&nbsp;
                        {knowledgeDetails.name}
                        <br />
                        Instances:&nbsp;&nbsp; {knowledgeDetails.instances}
                      </h4>
                    </div>
                  }
                  content={
                    <ReactTable
                      data={data}
                      filterable
                      columns={this.state.columns}
                      defaultPageSize={5}
                      showPaginationBottom
                      getTheadThProps={() =>
                        // console.log('state, instance', state, rowInfo, column, instance);
                        ({
                          style: {
                            background: 'rgb(135, 206, 250)',
                          },
                        })
                      }
                      className="-striped -highlight"
                    />
                  }
                />
              </Col>
            </Row>
          </Grid>
        </Loader>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    knowledgeDetails: state.dashboardReducer.knowledgeDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getKnowledgeDetails: bindActionCreators(getKnowledgeDetails, dispatch),
  };
}

KnowledgeDetails.propTypes = {
  getKnowledgeDetails: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KnowledgeDetails);
