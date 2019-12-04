import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import Card from '../../../components/Card/Card';
import { structuredColumns } from '../../../utils/const/tableColumns';
import { getStructured } from '../../../actions/dashboardAction';
import { makeStructuredData } from '../../../utils/helpers/objectManageHelper';

import './style.css';

class StructuredDatasets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.viewClick = this.viewClick.bind(this);
    // this.getHeaderColor = this.getHeaderColor.bind(this);
  }

  componentDidMount() {
    console.log('this is structured');
    this.props.getStructured();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.structured !== nextProps.structured) {
      this.setState({ data: makeStructuredData(nextProps.structured) });
    }
  }

  // getHeaderColor(column) {
  //   let color = '';
  //   switch (column.Header) {
  //     case 'Job Group':
  //       color = 'rgb(153, 204, 153)';
  //       break;
  //     case 'Most Recent Cycle':
  //       color = 'rgb(255, 191, 0)';
  //       break;
  //     case 'Dataset Cut':
  //       color = 'rgb(135, 206, 250)';
  //       break;
  //     default:
  //       color = '';
  //   }
  //   return color;
  // }

  viewClick(cutId) {
    console.log('cutsId: ', cutId);
  }

  render() {
    const { structured, isFetching } = this.props;
    const { data } = this.state;
    console.log('structured data in view', structured);
    console.log('structured state data in view', data);
    // const tdArray = [[13, 'Weather Underground', 'API', 16, 20, 20, 'Halted', 128]];
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Dataset Cuts"
                  content={
                    <ReactTable
                      data={data}
                      filterable
                      columns={structuredColumns}
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
    structured: state.dashboardReducer.structured,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStructured: bindActionCreators(getStructured, dispatch),
  };
}

StructuredDatasets.propTypes = {
  structured: PropTypes.array,
  getStructured: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StructuredDatasets);
