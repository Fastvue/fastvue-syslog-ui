import React from 'react';
import PropTypes from 'prop-types';
import { Label, FormGroup, Input } from 'reactstrap';
import ToggleButton from 'components/ToggleButton';

import './style.scss';

const FormBuilder = (props) => (
  <FormGroup>
    {props.label && <Label for={props.name}>{props.label}</Label>}
    {props.widget === 'input' && (
      <Input
        type={props.type}
        name={props.name}
        onChange={(e) => props.onChange(props.name, e.target.value)}
        value={props.value}
      />
    )}
    {props.widget === 'toggleButton' && (
      <ToggleButton
        isButtonOn={props.value}
        onClick={(value) => props.onChange(props.name, !value)}
      />
    )}
  </FormGroup>
);

FormBuilder.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  widget: PropTypes.string,
  onChange: PropTypes.func
};

export default FormBuilder;
