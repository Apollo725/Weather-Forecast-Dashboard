import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { generateMultiCell, customFilter } from '../helpers/tableColumnHelper';
import { getCellStyleHelper } from '../helpers/styleHeler';
// columns of structured table
export const structuredColumns = [
  {
    Header: 'Job Group',
    columns: [
      {
        Header: 'ID',
        accessor: 'jobId',
        maxWidth: 50,
      },
      {
        Header: 'Name',
        accessor: 'jobName',
        Cell: ({ row }) => (
          <CustomLink
            to={{
              pathname: `/dashboard/acquisition-jobs/${row.jobId}`,
            }}
          >
            {row.jobName}
          </CustomLink>
        ),
        width: 200,
      },
    ],
  },
  {
    Header: 'Most Recent Cycle',
    columns: [
      {
        Header: 'Last Refresh',
        accessor: 'refreshedAt',
      },
      {
        Header: 'CycleID',
        accessor: 'cycleId',
        Cell: ({ row }) => (
          <CustomLink to={{ pathname: `/dashboard/acquisition-jobs/${row.jobId}` }}>
            {row.cycleId}
          </CustomLink>
        ),
      },
    ],
  },
  {
    Header: 'Dataset Cut',
    columns: [
      {
        Header: 'ID',
        accessor: 'cutId',
        Cell: row => generateMultiCell(row, 'cutId'),
        filterMethod: (filter, row) => customFilter(filter, row, 'cutId'),
      },
      {
        Header: 'Name',
        accessor: 'cutName',
        width: 200,
        Cell: ({ row }) => {
          // console.log('view row structured1', row);
          const length = row.cutId.length;
          if (length > 0) {
            return row.cutId.map((prop, key) => (
              <CustomLink
                to={{
                  pathname: `/dashboard/structured-datasets/detail`,
                  state: {
                    jobId: row.jobId,
                    cycleId: row.cycleId,
                    cutId: prop['cutId' + String(key + 1)],
                  },
                }}
                key={key}
              >
                {row.cutName[key]['cutName' + String(key + 1)]}
                {length !== key + 1 && <br />}
                {length !== key + 1 && <br />}
              </CustomLink>
            ));
          }
          return '';
        },
        filterMethod: (filter, row) => customFilter(filter, row, 'cutName'),
      },
      {
        Header: 'Rows',
        accessor: 'cutRows',
        Cell: row => generateMultiCell(row, 'cutRows'),
        filterMethod: (filter, row) => customFilter(filter, row, 'cutRows'),
      },
      {
        Header: 'Columns',
        accessor: 'cutColumns',
        Cell: row => generateMultiCell(row, 'cutColumns'),
        filterMethod: (filter, row) => customFilter(filter, row, 'cutColumns'),
      },
      {
        Header: 'LogoUrl',
        accessor: 'logoUrl',
        Cell: () => (
          <img
            src="https://www.w3schools.com/images/w3schools_green.jpg"
            alt="W3Schools.com"
            style={{ width: '60px' }}
          />
        ),
        filterable: false,
        sortable: false,
      },
      {
        Header: 'View',
        accessor: 'view',
        maxWidth: 50,
        Cell: ({ row }) => {
          const length = row.cutId.length;
          // console.log('view row structured', row);
          if (length > 0) {
            return row.cutId.map((prop, key) => (
              <CustomLink
                to={{
                  pathname: `/dashboard/structured-datasets/detail`,
                  state: {
                    jobId: row.jobId,
                    cycleId: row.cycleId,
                    cutId: prop['cutId' + String(key + 1)],
                  },
                }}
                key={key}
              >
                view
                {length !== key + 1 && <br />}
                {length !== key + 1 && <br />}
              </CustomLink>
            ));
          }
          return '';
        },
        filterable: false,
        sortable: false,
      },
    ],
  },
];

// columns in raw content sets table
export const rawColumns = [
  {
    Header: 'Job Group',
    columns: [
      {
        Header: 'ID',
        accessor: 'jobId',
        maxWidth: 50,
      },
      {
        Header: 'JobGroup ID',
        accessor: 'jobGroupId',
        maxWidth: 100,
      },
      {
        Header: 'Name',
        accessor: 'jobName',
        width: 200,
        Cell: ({ row }) => (
          <CustomLink to={{ pathname: `/dashboard/acquisition-jobs/${row.jobId}` }}>
            {row.jobName}
          </CustomLink>
        ),
      },
    ],
  },
  {
    Header: 'Most Recent Cycle',
    columns: [
      {
        Header: 'Last Refresh',
        accessor: 'refreshedAt',
      },
      {
        Header: 'Cycle ID',
        accessor: 'cycleId',
        Cell: ({ row }) => (
          // console.log('raw content row', row);
          <CustomLink
            to={{
              pathname: `/dashboard/cycle-detail`,
              state: {
                jobId: row.jobId,
                cycleId: row.cycleId,
                jobGroupId: row.jobGroupId,
              },
            }}
          >
            {row.cycleId}
          </CustomLink>
        ),
      },
    ],
  },
  {
    Header: 'Acquisition Strategy',
    columns: [
      {
        Header: 'ID',
        accessor: 'strategyId',
      },
      {
        Header: 'Name',
        accessor: 'strategyName',
        width: 200,
        Cell: ({ row }) => (
          // console.log('view row raw content sets', row);
          <CustomLink
            to={{
              pathname: `/dashboard/cycle-detail`,
              state: {
                jobId: row.jobId,
                cycleId: row.cycleId,
                jobGroupId: row.jobGroupId,
              },
            }}
          >
            {row.strategyName}
          </CustomLink>
        ),
      },
    ],
  },
  {
    Header: 'Acquisition Step',
    columns: [
      {
        Header: 'Sequence',
        accessor: 'stepNumber',
        Cell: row => generateMultiCell(row, 'stepNumber'),
        filterMethod: (filter, row) => customFilter(filter, row, 'stepNumber'),
      },
      {
        Header: 'Name',
        accessor: 'stepName',
        width: 200,
        Cell: ({ row }) => {
          // console.log('----row view', row);
          const length = row.stepName.length;
          if (length > 0) {
            return row.stepName.map((prop, key) => (
              <CustomLink
                key={key}
                to={{
                  pathname: `/dashboard/cycle-detail/${
                    row.stepNumber[key]['stepNumber' + String(key + 1)]
                  }`,
                  state: {
                    jobId: row.jobId,
                    cycleId: row.cycleId,
                    jobGroupId: row.jobGroupId,
                    step: row.stepNumber[key]['stepNumber' + String(key + 1)],
                  },
                }}
              >
                {prop['stepName' + String(key + 1)]}
                {length !== key + 1 && <br />}
                {length !== key + 1 && <br />}
              </CustomLink>
            ));
          }
          return '';
        },
        filterMethod: (filter, row) => customFilter(filter, row, 'stepName'),
      },
    ],
  },
  {
    Header: 'Most Recent Cycle',
    columns: [
      {
        Header: 'Sets',
        accessor: 'sets',
        Cell: row => generateMultiCell(row, 'sets'),
        filterMethod: (filter, row) => customFilter(filter, row, 'sets'),
      },
      {
        Header: 'LogoUrl',
        accessor: 'logoUrl',
        Cell: () => (
          <img
            src="https://www.w3schools.com/images/w3schools_green.jpg"
            alt="W3Schools.com"
            style={{ width: '60px' }}
          />
        ),
        filterable: false,
        sortable: false,
      },
      {
        Header: 'View',
        accessor: 'view',
        maxWidth: 50,
        Cell: ({ row }) => {
          // console.log('----row view', row.view);
          const length = row.view.length;
          if (length > 0) {
            return row.view.map((prop, key) => (
              <CustomLink
                key={key}
                to={{
                  pathname: `/dashboard/cycle-detail/${
                    row.stepNumber[key]['stepNumber' + String(key + 1)]
                  }`,
                  state: {
                    jobId: row.jobId,
                    cycleId: row.cycleId,
                    jobGroupId: row.jobGroupId,
                    step: row.stepNumber[key]['stepNumber' + String(key + 1)],
                  },
                }}
              >
                {prop['view' + String(key + 1)]}
                {length !== key + 1 && <br />}
                {length !== key + 1 && <br />}
              </CustomLink>
            ));
          }
          return '';
        },
        filterable: false,
        sortable: false,
      },
    ],
  },
];

export const groupColumnSort = ['Acquisition Strategy', 'Most Recent Acquisition'];
export const groupColumn = [
  'ID',
  'Name',
  'Information Source',
  'Health State',
  'Total Tasks Generated',
  'Total Tasks w/Errors',
  '% Completed',
  'View',
];

export const groupColumns = [
  {
    Header: 'Acquisition Strategy',
    columns: [
      { Header: 'Job Group Id', accessor: 'strategyId', minWidth: 100 },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Information Source', accessor: 'source', minWidth: 130 },
    ],
  },
  {
    Header: 'Most Recent Acquisition',
    columns: [
      { Header: 'Health State', accessor: 'status' },
      { Header: 'Total Tasks Generated', accessor: 'generated', minWidth: 150 },
      { Header: 'Total Tasks Completed', accessor: 'completed', minWidth: 150 },
      { Header: 'Total Tasks w/Errors', accessor: 'errors', minWidth: 130 },
      { Header: '% Completed', accessor: 'percentageCompleted' },
      {
        Header: 'View',
        accessor: 'view',
        Cell: cellInfo => {
          console.log('----------raw content row', cellInfo);
          return (
            <CustomLink
              to={{
                pathname: `/dashboard/cycles/${cellInfo.original.name}/${
                  cellInfo.original.jobGroupId
                }`,
              }}
            >
              view
            </CustomLink>
          );
        },
        filterable: false,
        sortable: false,
        minWidth: 50,
      },
    ],
  },
];
export const makeCycleDetailsColumns = levels => [
  {
    Header: 'Entity',
    columns: [
      {
        Header: 'Content ID',
        accessor: 'content_id',
      },
      {
        Header: 'Content Set ID',
        accessor: 'content_set_id',
      },
    ],
  },
  {
    Header: 'View Content',
    columns: levels.map((prop, key) => ({
      Header: 'Level ' + String(key + 1),
      accessor: 'level' + String(key + 1),
      Cell: cellInfo => (
        // console.log('---raw content row', cellInfo.original);
        // console.log('---raw content levels', prop);
        <CustomLink
          to={{
            pathname: `/dashboard/data`,
            state: {
              cycleId: prop.cycleId,
              jobGroupId: prop.jobGroupId,
              jobId: prop.jobId,
              taskId: cellInfo.original.task_id,
              level: key + 1,
              step: cellInfo.original.step,
              set: cellInfo.original.set_id,
            },
          }}
        >
          view
        </CustomLink>
      ),
      filterable: false,
      sortable: false,
    })),
  },
];

export const cyclesColumns = [
  {
    Header: 'Processing',
    columns: [
      { Header: 'Cycle', accessor: 'cycle', maxWidth: 60 },
      { Header: 'Start', accessor: 'start', width: 100 },
      { Header: 'Completion', accessor: 'completion', width: 100 },
      { Header: 'State', accessor: 'state', width: 80 },
    ],
  },
  {
    Header: 'Acquisition Tasks',
    columns: [
      { Header: 'Generated', accessor: 'acquisition_generated', maxWidth: 100 },
      { Header: 'Completed', accessor: 'acquisition_completed', width: 100 },
      { Header: 'Errors', accessor: 'acquisition_errors', width: 70 },
      {
        Header: 'Percentage',
        accessor: 'acquisition_percentage',
        getProps: (state, rowInfo) => {
          if (rowInfo) {
            return getCellStyleHelper(rowInfo, 'acquisition_percentage');
          }
          return '';
        },
        width: 100,
      },
    ],
  },
  {
    Header: 'Processing Tasks',
    columns: [
      { Header: 'Generated', accessor: 'processing_generated', maxWidth: 100 },
      { Header: 'Completed', accessor: 'processing_completed', width: 100 },
      { Header: 'Errors', accessor: 'processing_errors', width: 70 },
      {
        Header: 'Percentage',
        accessor: 'processing_percentage',
        getProps: (state, rowInfo) => {
          if (rowInfo) {
            return getCellStyleHelper(rowInfo, 'processing_percentage');
          }
          return '';
        },
        width: 100,
      },
    ],
  },
  {
    Header: 'Ingestion Tasks',
    columns: [
      { Header: 'Generated', accessor: 'ingestion_generated', maxWidth: 100 },
      { Header: 'Completed', accessor: 'ingestion_completed', width: 100 },
      { Header: 'Errors', accessor: 'ingestion_errors', width: 70 },
      {
        Header: 'Percentage',
        accessor: 'ingestion_percentage',
        getProps: (state, rowInfo) => {
          // console.log('--------getProps, ingestion', rowInfo);
          if (rowInfo) {
            return getCellStyleHelper(rowInfo, 'ingestion_percentage');
          }
          return '';
        },
        width: 100,
      },
    ],
  },
  {
    Header: '',
    columns: [
      {
        Header: 'Integration Ration',
        accessor: 'ration',
        getProps: (state, rowInfo) => {
          if (rowInfo) {
            return getCellStyleHelper(rowInfo, 'ration');
          }
          return '';
        },
        width: 140,
      },
      {
        Header: 'View',
        accessor: 'view',
        Cell: cellInfo => {
          console.log('cellInfo', typeof cellInfo.original.jobGroupId);
          return (
            <CustomLink
              to={{
                pathname: `/dashboard/cycle-detail`,
                state: {
                  cycleId: cellInfo.original.cycleId,
                  jobGroupId: Number(cellInfo.original.jobGroupId),
                },
              }}
            >
              view
            </CustomLink>
          );
        },
        width: 60,
        filterable: false,
        sortable: false,
      },
    ],
  },
];

// function to make columns of knowledge details table
export const makeKnowledgeDetailsColumns = columns => {
  // console.log('tableColumns.js columns', columns);
  const resultColumnsArray = columns.map((prop, key) => {
    if (key > 0) {
      const row = {
        id: prop,
        Header: prop,
        accessor: d => d[prop].value,
        Cell: cellInfo => (
          // console.log('--------cellinfo conosle', cellInfo.original[`${prop}`].id);
          <CustomLink
            to={{
              pathname: `/dashboard/knowledge-bases/${cellInfo.original[`${prop}`].id}`,
            }}
          >
            {cellInfo.original[`${prop}`].value}
          </CustomLink>
        ),
      };
      return row;
    }
    const row = {
      id: prop,
      Header: prop,
      accessor: d => d[columns[key]].value,
    };
    return row;
  });
  // console.log('------columns-----tableColumns.js resultColumnsArray', resultColumnsArray);
  return resultColumnsArray;
};

const CustomLink = styled(Link)`
  cursor: pointer;
  color: #3091b2;
  :hover {
    color: #23527c;
  }
`;
