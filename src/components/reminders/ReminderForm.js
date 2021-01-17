import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormTextInput from '../shared/forms/FormTextInput';
import FormDatePicker from '../shared/forms/FormDatePicker';
import FormErrorMessage from '../shared/forms/FormErrorMessage';
import FormLabel from '../shared/forms/FormLabel';
import FormFieldset from '../shared/forms/FormFieldset';
import BaseButton from '../shared/buttons/BaseButton';
import FormActions from '../shared/forms/FormActions';
import CheckIcon from '../icons/CheckIcon';
import FormTimePicker from '../shared/forms/FormTimePicker';
import { ReminderPropType } from '../shared/prop-types/reminder';

const ReminderSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, 'Characters too long')
    .required('Required'),
  email: Yup.string()
    .email("Invalid email format")
    .required("Required!"),
});

class ReminderForm extends Component {
  static propTypes = {
    reminder: ReminderPropType.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  getInitialValues = () => {
    const { name, date, time, email } = this.props.reminder;
    return {
      name,
      date,
      time,
      email: email,
    };
  };

  handleSubmit = (values) => {
    this.props.onSubmit({
      id: this.props.reminder.id,
      name: values.name,
      email: values.email,
      date: values.date,
      time: values.time,
    });
  };

  render() {
    return (
      <Formik
        initialValues={this.getInitialValues()}
        validationSchema={ReminderSchema}
        onSubmit={this.handleSubmit}
      >
        <Form className="w-full flex flex-col gap-3">
          <FormFieldset>
            <FormLabel htmlFor="name">
              Name
            </FormLabel>
            <div className="flex flex-row flex-wrap gap-2">
              <Field
                id="name"
                name="name"
                component={FormTextInput}
                placeholder="e.g.: AntiKode"
                className="flex-grow"
              />
              
            </div>
            <ErrorMessage component={FormErrorMessage} name="name" />
            <ErrorMessage component={FormErrorMessage} name="color" />
          </FormFieldset>

          <FormFieldset>
            <FormLabel htmlFor="date">Time</FormLabel>

            <div className="flex flex-row flex-wrap gap-2">
              <Field
                id="date"
                name="date"
                component={FormDatePicker}
                className="flex-grow"
              />
              <Field
                id="time"
                name="time"
                component={FormTimePicker}
                className="w-full sm:w-44"
              />
            </div>
            <ErrorMessage component={FormErrorMessage} name="date" />
            <ErrorMessage component={FormErrorMessage} name="time" />
          </FormFieldset>

          <FormFieldset>
            <FormLabel htmlFor="email">Invitees by Email</FormLabel>
            <Field
              id="email"
              name="email"
              component={FormTextInput}
              placeholder="e.g.: admin@gmail.com"
            />
            <ErrorMessage component={FormErrorMessage} name="email" />
          </FormFieldset>

          <FormActions>
            <BaseButton
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-500 text-white"
            >
              <CheckIcon svgClassName="w-6 h-6" />
              Confirm
            </BaseButton>
          </FormActions>
        </Form>
      </Formik>
    );
  }
}

export default ReminderForm;
