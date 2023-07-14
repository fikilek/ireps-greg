import React from 'react'
import FormikButton from './FormikButton';
import FormikDatePicker from './FormikDatePcker';
import FormikInput from './FormikInput'
import FormikMeterFieldArray from './FormikMeterFieldArray';
import FormikScFieldArray from './FormikScFieldArray';
import FormikSelect from './FormikSelect';

const FormikControl = (props) => {
  const { control, ...rest } = props
  // console.log(`rest`, rest)
  switch (control) {
    case 'input': return <FormikInput {...rest} />;
    case 'scFieldArray': return <FormikScFieldArray {...rest} />;
    case 'meterFieldArray': return <FormikMeterFieldArray {...rest} />;
    case 'button': return <FormikButton {...rest} />;
    // case 'textarea': return '';
    case 'select': return <FormikSelect {...rest} />;
    // case 'radio': return '';
    // case 'checkbox': return '';
    case 'datetime': return <FormikDatePicker {...rest} />;
    default: return null;
  }
}     
  

export default FormikControl