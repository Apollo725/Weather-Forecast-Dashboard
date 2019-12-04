import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import Card from '../../../components/Card/Card';
import { getRaw } from '../../../actions/dashboardAction';
import { rawColumns } from '../../../utils/const/tableColumns';
import { makeRawData } from '../../../utils/helpers/objectManageHelper';

class RawContentsets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    // this.getHeaderColor = this.getHeaderColor.bind(this);
  }

  componentDidMount() {
    this.props.getRaw();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.raw !== this.props.raw) {
      this.setState({ data: makeRawData(nextProps.raw) });
    }
  }

  // getHeaderColor(column) {
  //   let color = '';
  //   switch (column.Header) {
  //     case 'Job Group':
  //       color = 'rgb(153, 204, 153)';
  //       break;
  //     case 'Most Recent Cycle':
  //       color = '	rgb(255, 191, 0)';
  //       break;
  //     case 'Acquisition Strategy':
  //       color = 'rgb(135, 206, 250)';
  //       break;
  //     case 'Acquisition Step':
  //       color = '	rgb(0, 200, 255)';
  //       break;
  //     default:
  //       color = '';
  //   }
  //   return color;
  // }

  render() {
    const { data } = this.state;
    const { isFetching } = this.props;
    console.log('raw content data111', data);
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Content Sets"
                  content={
                    <ReactTable
                      data={data}
                      filterable
                      columns={rawColumns}
                      defaultPageSize={5}
                      showPaginationBottom
                      getTheadGroupThProps={() =>
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
    raw: state.dashboardReducer.raw,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRaw: bindActionCreators(getRaw, dispatch),
  };
}

RawContentsets.propTypes = {
  raw: PropTypes.array,
  getRaw: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawContentsets);
