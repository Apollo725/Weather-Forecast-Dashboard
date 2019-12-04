import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import Card from '../../../components/Card/Card';
import { getGroup, getSpecificGroup } from '../../../actions/dashboardAction';
import { groupColumns } from '../../../utils/const/tableColumns';
import { makeAcquisitionData } from '../../../utils/helpers/objectManageHelper';

class AcquisitionJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupData: [],
    };
    this.getHeaderColor = this.getHeaderColor.bind(this);
  }

  componentDidMount() {
    // console.log('jobGroupId params', this.props.match);
    const { jobGroupId } = this.props.match.params;
    console.log('jobGroupId params', jobGroupId);
    if (jobGroupId) {
      this.props.getSpecificGroup(jobGroupId);
    } else {
      this.props.getGroup();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group) {
      if (nextProps.group !== this.props.group) {
        console.log('acquisition props', nextProps.group);
        this.setState({ groupData: makeAcquisitionData(nextProps.group) });
      }
    }
    if (nextProps.specificGroup) {
      if (nextProps.specificGroup !== this.props.specificGroup) {
        console.log('specific acquisition props', nextProps.group);
        const specificGroup = [];
        specificGroup.push(nextProps.specificGroup);
        this.setState({
          groupData: makeAcquisitionData(specificGroup),
        });
      }
    }
  }

  getHeaderColor(column) {
    let color = '';
    switch (column.Header) {
      case 'Acquisition Strategy':
        color = 'rgb(153, 204, 153)';
        break;
      case 'Most Recent Acquisition':
        color = 'rgb(135, 206, 250)';
        break;
      default:
        color = 'rgb(255, 191, 0)';
    }
    return color;
  }

  render() {
    const { isFetching } = this.props;
    const { groupData } = this.state;
    // let groupData = [];
    // if (group) {
    //   groupData = group;
    // } else {
    //   groupData = specificGroup;
    // }
    console.log('group', groupData);
    // const thArray = [
    //   'Id',
    //   'name',
    //   'source',
    //   'percentage Completed',
    //   'errors',
    //   'completed',
    //   'status',
    //   'generated',
    // ];
    // const tdArray = [[13, 'Weather Underground', 'API', 16, 20, 20, 'Halted', 128]];
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Information Acquisition Job Groups"
                  content={
                    <ReactTable
                      data={groupData}
                      filterable
                      columns={groupColumns}
                      defaultPageSize={5}
                      showPaginationBottom
                      getTheadGroupThProps={(state, rowInfo, column) =>
                        // console.log('state, instance', state, rowInfo, column, instance);
                        ({
                          style: {
                            background: this.getHeaderColor(column),
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
    group: state.dashboardReducer.group,
    specificGroup: state.dashboardReducer.specificGroup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGroup: bindActionCreators(getGroup, dispatch),
    getSpecificGroup: bindActionCreators(getSpecificGroup, dispatch),
  };
}

AcquisitionJobs.propTypes = {
  group: PropTypes.array,
  getGroup: PropTypes.func.isRequired,
  getSpecificGroup: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AcquisitionJobs);
