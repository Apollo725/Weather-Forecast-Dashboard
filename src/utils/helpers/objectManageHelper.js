import { formatDate } from './dateHelper';
// make an object which is configured by linear array(arr1) as key and matrix array(arr2) as value
export function makeObjectWithTwoArray(arr1, arr2) {
  // console.log('arr2', arr2);
  return arr2.map(prop =>
    // apply reduce function between prop, arr1;
    prop.reduce((acc, obj, currentIndex) => {
      if (arr1[currentIndex]) {
        const index = arr1[currentIndex];
        if (acc[index] === undefined) {
          acc[index] = '';
        }
        acc[index] = obj;
        return acc;
      }
      // alert('server side data error!');
      return {};
    }, {}),
  );
}

export function mergeObject(obj1, obj2) {
  return obj1.map((prop, key) => {
    if (obj2[key]) {
      return Object.assign(prop, obj2[key]);
    }
    return {};
  });
}
// content for StructuredDatasets table
export function makeStructuredData(propsData) {
  // console.log('propsData', propsData);

  return propsData.map(prop => ({
    jobId: prop.jobId,
    jobName: prop.jobName,
    jobGroupId: prop.jobGroupId,
    refreshedAt: formatDate(prop.refreshedAt),
    cycleId: prop.cycleId,
    cutId: prop.cuts.map((prop, key) => {
      const obj1 = {};
      obj1['cutId' + String(key + 1)] = prop.id;
      // console.log('object cutsId', obj1);
      // console.log('object prop', prop);
      return obj1;
    }),
    cutName: prop.cuts.map((prop, key) => {
      const obj2 = {};
      obj2['cutName' + String(key + 1)] = prop.name;
      return obj2;
    }),
    cutRows: prop.cuts.map((prop, key) => {
      const obj3 = {};
      obj3['cutRows' + String(key + 1)] = prop.rows;
      return obj3;
    }),
    cutColumns: prop.cuts.map((prop, key) => {
      const obj4 = {};
      obj4['cutColumns' + String(key + 1)] = prop.columns;
      return obj4;
    }),
    view: prop.cuts.map((prop, key) => {
      const obj5 = {};
      obj5['view' + String(key + 1)] = 'view';
      return obj5;
    }),
  }));
}

// content for RawContentsets Table
export function makeRawData(propsData) {
  // console.log('Raw data', propsData);
  return propsData.map(prop => ({
    jobId: prop.jobId,
    jobName: prop.jobName,
    jobGroupId: prop.jobGroupId,
    refreshedAt: formatDate(prop.refreshedAt),
    cycleId: prop.cycleId,
    strategyId: prop.strategies[0].strategyId,
    strategyName: prop.strategies[0].strategyName,
    stepNumber: prop.strategies[0].steps.map((prop, key) => {
      const obj1 = {};
      obj1['stepNumber' + String(key + 1)] = prop.stepNumber;
      return obj1;
    }),
    stepName: prop.strategies[0].steps.map((prop, key) => {
      const obj2 = {};
      obj2['stepName' + String(key + 1)] = prop.stepName;
      return obj2;
    }),
    sets: prop.strategies[0].steps.map((prop, key) => {
      const obj3 = {};
      obj3['sets' + String(key + 1)] = prop.sets;
      return obj3;
    }),
    view: prop.strategies[0].steps.map((prop, key) => {
      const obj4 = {};
      obj4['view' + String(key + 1)] = 'view';
      return obj4;
    }),
  }));
}

// get table header of structured dataset detail table with API Json response
export function getDatasetColumns(propsData) {
  // console.log('objectManager getDatasetColumns', propsData);
  // const columnLength = propsData.columns;
  const columnIndex = [
    {
      Header: '',
      columns: [{ id: 'row', Header: 'Row Number', accessor: 'rowNumber' }],
    },
  ];
  const columnContent = propsData.columnNames.map((prop, key) => ({
    Header: 'Column' + String(key + 1),
    columns: [{ id: prop, Header: prop, accessor: prop }],
  }));
  const columnData = columnIndex.concat(columnContent);
  // console.log('columnData', columnData);
  return columnData;
}

// get table content of structured dataset detail table with API Json response
export function getDatasetContent(propsData) {
  // console.log('objectManager getDatasetColumns', propsData);
  const tableContent = propsData.data.map((prop, key) => {
    const temp = {};
    for (let i = 0; i < prop.length; i += 1) {
      if (i === 0) {
        temp.rowNumber = key + 1;
      }
      const tempKey = propsData.columnNames[i];
      temp[tempKey] = prop[i];
    }
    return temp;
  });
  // console.log('temp', tableContent);
  return tableContent;
}

// make content of Aquisition Job table with API Json response

export function makeAcquisitionData(propsData) {
  console.log('makeAcquisitionData', propsData);
  if (propsData.length > 0) {
    const groupData = propsData.map(prop => {
      const temp = {
        strategyId: prop.strategyId,
        name: prop.name,
        source: prop.source,
        status: prop.status,
        generated: prop.generated,
        completed: prop.completed,
        errors: prop.errors,
        percentageCompleted: prop.percentageCompleted,
        jobGroupId: prop.jobGroupId,
      };
      return temp;
    });
    return groupData;
  }
  const groupData = [
    {
      strategyId: propsData.strategyId,
      name: propsData.name,
      source: propsData.source,
      status: propsData.status,
      generated: propsData.generated,
      completed: propsData.completed,
      errors: propsData.errors,
      percentageCompleted: propsData.percentageCompleted,
      view: 'view',
    },
  ];
  return groupData;
}

export function makeCycleDetails(propsData) {
  console.log('cycleDetails nextprops', propsData);
  const cycleDetailsArray = propsData.steps.map((stepsData, key) => {
    // console.log('stepsData result', stepsData, key);
    const stepIndex = key;

    const stepDataWithoutView = stepsData.items.map(prop => {
      // console.log('stepsData prop', prop, key);
      const contentItem = {
        content_id: prop.rowId,
        content_set_id: prop.setId,
        task_id: prop.taskId,
        set_id: prop.setId,
        step: stepIndex + 1,
      };
      return contentItem;
    });
    // console.log('stepsData', stepDataWithoutView);
    const levelLength = stepsData.levels.length;

    if (stepDataWithoutView) {
      for (let i = 0; i < stepDataWithoutView.length; i += 1) {
        for (let j = 0; j < levelLength; j += 1) {
          stepDataWithoutView[i]['level' + String(j + 1)] = 'view';
        }
      }
      const stepDataWithView = stepDataWithoutView;
      // console.log('stepDataWithView', stepDataWithView);
      return stepDataWithView;
    }
    return '';
  });
  console.log('cycleDetailsArray', cycleDetailsArray);
  return cycleDetailsArray;
}

export function makeCyclesData(propsData, jobGroupId) {
  console.log('cycles data in function', propsData);
  const cyclesData = propsData.map(prop => {
    const { processing, acquisition, ingestion } = prop;
    const cycleRow = {
      cycle: prop.cycleId,
      start: formatDate(prop.start),
      completion: formatDate(prop.completed),
      state: prop.state,
      acquisition_generated: acquisition.generated,
      acquisition_completed: acquisition.completed,
      acquisition_errors: acquisition.errors,
      acquisition_percentage: acquisition.percentage + '%',
      processing_generated: processing.generated,
      processing_completed: processing.completed,
      processing_errors: processing.errors,
      processing_percentage: processing.percentage + '%',
      ingestion_generated: processing.generated,
      ingestion_completed: processing.completed,
      ingestion_errors: ingestion.errors,
      ingestion_percentage: ingestion.percentage + '%',
      ration: prop.integrationRatio + '%',
      view: 'view',
      jobGroupId,
      cycleId: prop.cycleId,
    };
    return cycleRow;
  });
  return cyclesData;
}

export function makeKnowledgeDetailsData(data, columns) {
  console.log('make function', data, columns);
  const result = data.map(prop => {
    const temp = {};
    for (let i = 0; i < prop.length; i += 1) {
      temp[columns[i]] = { id: prop[i].id, value: prop[i].value };
    }
    // return temp;

    return temp;
  });
  // console.log('------data-----make knowledge detail data result', result);
  return result;
}
