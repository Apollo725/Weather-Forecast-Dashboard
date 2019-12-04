import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import Card from '../../../components/Card/Card';
import { getCycles } from '../../../actions/dashboardAction';
import { cyclesColumns } from '../../../utils/const/tableColumns';
import { makeCyclesData } from '../../../utils/helpers/objectManageHelper';

class Cycles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: [],
      jobGroupId: null,
      jobGroupName: null,
    };
  }

  componentDidMount() {
    const { jobGroupId, jobGroupName } = this.props.match.params;
    this.props.getCycles(jobGroupId);
    this.setState({ jobGroupId, jobGroupName });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cycles !== this.props.cycles) {
      this.setState({
        tableContent: makeCyclesData(nextProps.cycles, this.props.match.params.jobGroupId),
      });
    }
  }

  render() {
    const { tableContent, jobGroupId, jobGroupName } = this.state;
    const { isFetching } = this.props;
    console.log('cycles in cycles render', jobGroupId);
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title={'Information Acquisition Job Group #' + jobGroupId + ' - ' + jobGroupName}
                  content={
                    <ReactTable
                      data={tableContent}
                      filterable
                      columns={cyclesColumns}
                      defaultPageSize={5}
                      showPaginationBottom
                      getTheadGroupTrProps={() =>
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
    cycles: state.dashboardReducer.cycles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCycles: bindActionCreators(getCycles, dispatch),
  };
}

Cycles.propTypes = {
  cycles: PropTypes.array,
  getCycles: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cycles);
