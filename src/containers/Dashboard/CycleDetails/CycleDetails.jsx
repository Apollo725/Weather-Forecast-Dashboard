import React, { Component } from 'react';
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { getCycleDetails, getSpecificCycleDetail } from '../../../actions/dashboardAction';
import Card from '../../../components/Card/Card';
import { makeCycleDetails } from '../../../utils/helpers/objectManageHelper';
import { makeCycleDetailsColumns } from '../../../utils/const/tableColumns';

class CycleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: [],
      entity: [],
      levels: [],
    };
  }

  componentDidMount() {
    const { jobGroupId, cycleId, step } = this.props.location.state;
    // console.log('cycleDetail did mount ', step);
    if (step) {
      this.props.getSpecificCycleDetail(jobGroupId, cycleId, step);
    } else {
      // console.log('log________', typeof jobGroupId, cycleId);
      this.props.getCycleDetails(jobGroupId, cycleId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cycleDetails !== this.props.cycleDetails) {
      const { cycleDetails } = nextProps;
      this.setState({
        tableContent: makeCycleDetails(cycleDetails),
        entity: cycleDetails,
      });
      this.setState({ levels: cycleDetails.steps[0].levels });
    }
    // console.log('nextProps.specificCycledetails', nextProps.specificCycleDetail);
    if (nextProps.specificCycleDetail !== this.props.specificCycleDetail) {
      const { specificCycleDetail } = nextProps;
      this.setState({
        tableContent: makeCycleDetails(specificCycleDetail),
        entity: specificCycleDetail,
      });
      this.setState({ levels: specificCycleDetail.steps[0].levels });
    }
  }

  render() {
    const { tableContent, entity, levels } = this.state;
    const { isFetching } = this.props;
    // const { stepNumber } = this.props.match.params;
    // console.log('cycleDetail component in render ', stepNumber);
    // console.log('-----tableContent in cycleDetails render ', tableContent);
    // console.log('-----entity in cycleDetails', entity);
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Card
            content={
              <div>
                <h4>
                  Information Acquisition Job Group #{entity.jobGroupId}: &quot;
                  {entity.jobGroupName}
                  &quot;
                </h4>
                <h4>Acquisition Cycle #{entity.cycleId} </h4>
              </div>
            }
          />
          {tableContent.map((prop, key) => (
            <Card
              key={key}
              title={`Acquisition Job ${entity.steps[key].jobId} - ${entity.steps[key].jobName}`}
              content={
                <div>
                  <ReactTable
                    data={prop}
                    filterable
                    columns={makeCycleDetailsColumns(levels)}
                    defaultPageSize={5}
                    showPaginationBottom
                    getTheadGroupThProps={(state, rowInfo, column) =>
                      // console.log('state, instance', state, rowInfo, column, instance);
                      ({
                        style: {
                          background:
                            column.Header === 'Entity'
                              ? 'rgb(153, 204, 153)'
                              : 'rgb(135, 206, 250)',
                        },
                      })
                    }
                    className="-striped -highlight"
                  />
                </div>
              }
            />
          ))}
        </Loader>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    cycleDetails: state.dashboardReducer.cycleDetails,
    specificCycleDetail: state.dashboardReducer.specificCycleDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCycleDetails: bindActionCreators(getCycleDetails, dispatch),
    getSpecificCycleDetail: bindActionCreators(getSpecificCycleDetail, dispatch),
  };
}

CycleDetails.propTypes = {
  getCycleDetails: PropTypes.func.isRequired,
  getSpecificCycleDetail: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CycleDetails);
