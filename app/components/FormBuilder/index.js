import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Label, FormGroup, Input, Col } from 'reactstrap';
import ToggleButton from 'components/ToggleButton';

import './style.scss';

const InputWidget = (props) => (
  <Input
    type={props.type}
    name={props.name}
    onChange={(e) => props.onChange(props.name, e.target.value)}
    value={props.value}
  />
);

const ToggleButtonWidget = (props) => (
  <ToggleButton
    isButtonOn={props.value}
    onClick={(value) => props.onChange(props.name, !value)}
  />
);

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

    {props.widget === 'inputGroup' && (
      <Fragment>
        {props.group.map((item) => (
          <Fragment key={item.id}>
            &nbsp; &nbsp; &nbsp;
            <Input
              type={item.type}
              onChange={() => {
                props.onChange(props.name, item.label);
              }}
              name={props.name}
              value={item.label}
              checked={props.value === item.label}
            />
            {item.label && (
              <Label
                for={`${item.id}`}
                onClick={() => props.onChange(props.name, item.label)}
              >
                {item.label}
              </Label>
            )}
            &nbsp; &nbsp;
          </Fragment>
        ))}
      </Fragment>
    )}
    {props.widget === 'toggleButton' && (
      <ToggleButton
        isButtonOn={props.value}
        onClick={(value) => props.onChange(props.name, !value)}
      />
    )}
  </FormGroup>
);

export const buildForm = (props) => {
  if (props.child) {
    return (
      <Fragment> {props.child.map((item) => [props.widget](item))}</Fragment>
    );
  }
  return [props.widget](props);
};

export const NewFormBuilder = (props) => (
  <Fragment>
    {props.config.map((item) => {
      buildForm(item);
    })}
  </Fragment>
);

FormBuilder.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  group: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.string,
  widget: PropTypes.string,
  onChange: PropTypes.func
};

export default FormBuilder;
