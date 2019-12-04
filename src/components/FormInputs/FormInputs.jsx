import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

function FieldGroup({ label, ...props }) {
  const { empty, valid } = props;
  return (
    <FormGroup validationState={empty || valid ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {empty && <CustomControlLabel>This can not be empty</CustomControlLabel>}
      {valid && <CustomControlLabel>Invalid email address</CustomControlLabel>}
    </FormGroup>
  );
}

export class FormInputs extends Component {
  render() {
    const row = [];
    for (let i = 0; i < this.props.ncols.length; i += 1) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.proprieties[i]} />
        </div>,
      );
    }
    return <div className="row">{row}</div>;
  }
}
const CustomControlLabel = styled(ControlLabel)`
  color: red !important;
`;
export default FormInputs;
