import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { getDataset } from '../../../actions/dashboardAction';
import { getDatasetColumns, getDatasetContent } from '../../../utils/helpers/objectManageHelper';
// import { formatDateWithMonth } from '../../../utils/helpers/dateHelper';
import Card from '../../../components/Card/Card';
import { formatDateWithMonth, formatDate } from '../../../utils/helpers/dateHelper';

class Cuts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    // console.log('Cuts component did mount: ', location.state);
    const { jobId, cycleId, cutId } = location.state;
    this.props.getDataset(jobId, cycleId, cutId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset !== this.props.dataset) {
      // console.log('dataset', nextProps);
      this.setState({ columns: getDatasetColumns(nextProps.dataset) });
      this.setState({ data: getDatasetContent(nextProps.dataset) });
    }
  }

  render() {
    const { columns, data } = this.state;
    const { dataset, isFetching } = this.props;

    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Card
            title={`Structured Dataset View - Version ${dataset && dataset.version}, ${dataset &&
              formatDateWithMonth(dataset.createdAt)}`}
            content={
              <div>
                <p>
                  Information Acquisition Job Group &quot;
                  {dataset && dataset.jobGroupName} &quot;
                </p>
                <p>
                  Acquisition Cycle 24 -{' '}
                  {dataset && formatDate(dataset.start) + ' - ' + formatDate(dataset.completed)}
                </p>
              </div>
            }
          />
          <Card
            title="Structured Dataset &quot;countries&quot;"
            content={
              <div>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Acquisition Cycle:</td>
                      <td>{dataset && dataset.cycleId}</td>
                    </tr>
                    <tr>
                      <td>Completed on</td>
                      <td>05.09.2018 12:26:53</td>
                    </tr>
                    <tr>
                      <td>Acquisition Strategy:</td>
                      <td>Pull ISO Countries List (9)</td>
                    </tr>
                    <tr>
                      <td>Processing Step:</td>
                      <td>List ({dataset && dataset.step})</td>
                    </tr>
                    <tr>
                      <td>Columns:</td>
                      <td>{dataset && dataset.columns}</td>
                    </tr>
                    <tr>
                      <td>Rows:</td>
                      <td>{dataset && dataset.rows}</td>
                    </tr>
                  </tbody>
                </Table>
                <ReactTable
                  data={data}
                  filterable
                  columns={columns}
                  defaultPageSize={5}
                  showPaginationBottom
                  getTheadGroupThProps={(state, rowInfo, column) => {
                    console.log('state, instance', column);
                    return {
                      style: {
                        background: column.Header === '' ? '' : 'rgb(135, 206, 250)',
                      },
                    };
                  }}
                  getTheadThProps={(state, rowInfo, column) => {
                    console.log('state, instance', column);
                    return {
                      style: {
                        background: column.Header === 'Row Number' ? '#99cc99' : '',
                      },
                    };
                  }}
                  className="-striped -highlight"
                />
              </div>
            }
          />
        </Loader>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    dataset: state.dashboardReducer.dataset,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataset: bindActionCreators(getDataset, dispatch),
  };
}

Cuts.propTypes = {
  getDataset: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cuts);
