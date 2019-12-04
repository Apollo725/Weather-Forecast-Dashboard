import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import _ from 'lodash';
import Card from '../../../components/Card/Card';
import { getKnowledge } from '../../../actions/dashboardAction';
import { makeObjectWithTwoArray, mergeObject } from '../../../utils/helpers/objectManageHelper';
import 'react-table/react-table.css';

class KnowledgeBases extends Component {
  componentDidMount() {
    this.props.getKnowledge();
  }

  render() {
    const { knowledgeData, isFetching } = this.props;
    // const result1 = [];
    // knowledgeData.map((prop, key) => {
    //   // initialize all temp arrays and objects
    //   const thArrayType = [];
    //   const thArrayColumn = [];
    //   const element = {};
    //   let tdArray = [];
    //   // in case which entity data exists
    //   if (prop.hasEntity) {
    //     prop.entity.columns.map((entity, entityKey) => {
    //       if (entityKey === 0) {
    //         thArrayType.push('Entity Stats');
    //       } else {
    //         thArrayType.push('');
    //       }
    //       thArrayColumn.push(entity);
    //       return thArrayType;
    //     });
    //   }
    //   // in case which relationship data exists
    //   if (prop.hasRelationship) {
    //     prop.relationship.columns.map((relationship, relationshipKey) => {
    //       if (relationshipKey === 0) {
    //         thArrayType.push('Relationship Stats');
    //       } else {
    //         thArrayType.push('');
    //       }
    //       thArrayColumn.push(relationship);
    //       return thArrayType;
    //     });
    //   }
    //   // merge two arrays - entity data and relationship data
    //   const entityData = prop.entity.data;
    //   const relationshipData = prop.relationship.data;
    //   tdArray = entityData.map((value, index) => {
    //     if (relationshipData[index]) return _.concat(value, relationshipData[index]);
    //     return value;
    //   });
    //   // making array of one whole table
    //   element.thArrayType = thArrayType;
    //   element.thArrayColumn = thArrayColumn;
    //   element.tdArray = tdArray;
    //   result1[key] = element;
    //   return prop;
    // });
    // console.log('array result1', result1);

    /* ----making searchable table object---- */

    // making title and header array of searchable table object
    const result = [];
    knowledgeData.map((prop, key) => {
      // make column of two headers
      const entityColumns = [];
      const relationshipColumns = [];
      let knowledgeColumns = [];
      const element = {};
      prop.entity.columns.map(prop => {
        if (prop === 'Instances') {
          entityColumns.push({
            Header: `${prop}`,
            accessor: `${prop}`,
            Cell: cellInfo => {
              console.log('----------raw content row', cellInfo.original.ID);
              return (
                <CustomLink
                  to={{
                    pathname: `/dashboard/knowledge-bases/${cellInfo.original.ID}`,
                  }}
                >
                  {cellInfo.original.Instances}
                </CustomLink>
              );
            },
          });
        } else {
          entityColumns.push({ Header: `${prop}`, accessor: `${prop}` });
        }
        return entityColumns;
      });
      prop.relationship.columns.map(prop => {
        relationshipColumns.push({
          Header: `${prop}`,
          accessor: `${prop}`,
        });
        return relationshipColumns;
      });
      knowledgeColumns = [
        {
          Header: 'Entity Stats',
          columns: entityColumns,
        },
        { Header: 'Relationship Stats', columns: relationshipColumns },
      ];
      element.title = prop.title;
      element.columns = knowledgeColumns;

      // making content relevant to columns
      const entityContentObject = makeObjectWithTwoArray(prop.entity.columns, prop.entity.data);
      console.log('entityContentObject', entityContentObject);
      const relationshipContentObject = makeObjectWithTwoArray(
        prop.relationship.columns,
        prop.relationship.data,
      );
      console.log('relationshipContentObject', relationshipContentObject);
      const contentObject = mergeObject(entityContentObject, relationshipContentObject);

      element.content = contentObject;
      result[key] = element;

      return result;
    });

    // console.log('-----------knowledgeBases view:', knowledgeData);
    // console.log('----------result', result);
    // const temp = false;
    return (
      <div className="main-content">
        <Loader loaded={!isFetching} color="#000">
          <Grid fluid>
            {result.map((prop, key) => (
              <Row key={key}>
                <Col md={12}>
                  <Card
                    title={`Knowledge Base - "${prop.title}"`}
                    content={
                      <ReactTable
                        data={prop.content}
                        filterable
                        columns={prop.columns}
                        defaultPageSize={5}
                        showPaginationBottom
                        getTheadGroupThProps={(state, rowInfo, column) =>
                          // console.log('---------state, instance', state, rowInfo, column);
                          ({
                            style: {
                              background:
                                column.Header === 'Entity Stats'
                                  ? 'rgb(153, 204, 153)'
                                  : 'rgb(135, 206, 250)',
                            },
                          })
                        }
                        className="-striped -highlight"
                      />
                    }
                  />
                </Col>
              </Row>
            ))}
          </Grid>
        </Loader>
      </div>
    );
  }
}

const CustomLink = styled(Link)`
  cursor: pointer;
  color: #3091b2;
  :hover {
    color: #23527c;
  }
`;

function mapStateToProps(state) {
  return {
    isFetching: state.dashboardReducer.isFetching,
    knowledgeData: state.dashboardReducer.knowledgeData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getKnowledge: bindActionCreators(getKnowledge, dispatch),
  };
}

KnowledgeBases.propTypes = {
  getKnowledge: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KnowledgeBases);
