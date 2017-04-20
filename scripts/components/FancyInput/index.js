/* eslint react/prop-types: 0 */
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

import {
  SuccessGlyph,
  ErrorGlyph,
  WarningGlyph,
  SelectArrow,
  StatusLabel,
} from './symbols';

import eventList from './utils/event-list';

const VALIDATION_SUCCESS = 'validation-success';
const VALIDATION_ERROR = 'validation-error';
const VALIDATION_WARNING = 'validation-warning';
const VALIDATION_NEUTRAL = null;

class FancyInput extends Component {

  constructor(props) {
    super(props);
    this.state = { currentValue: null };

    this.updateCurrentValue = e => this.setState({ currentValue: e.target.value });

    this.eventHandlers = eventList.reduce((prev, curr) => {
      const eventResponder = props[curr];
      if (typeof eventResponder === 'function') {
        prev[curr] = eventResponder;
      }
      return prev;
    }, {});
  }

  static get defaultProps() {
    return {
      type: 'text',
      name: null,
      value: '',
      maxLength: null,
      placeholder: '',
      disabled: false,
      validationStatus: null,
      validationMessage: null,
      saveStatus: null,
      modificationRequiredForValidation: true,
    };
  }

  static get propTypes() {
    return {
      type: PropTypes.string,
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      maxLength: PropTypes.number,
      placeholder: PropTypes.string,
      disabled: PropTypes.bool,
      validationStatus: PropTypes.oneOf([
        VALIDATION_SUCCESS,
        VALIDATION_WARNING,
        VALIDATION_ERROR,
        null,
      ]),
      saveStatus: PropTypes.bool,
      modificationRequiredForValidation: PropTypes.bool,
    };
  }

  getElement() {
    return this.refs.inputElement;
  }

  getValue() {
    const { currentValue } = this.state;

    if (typeof currentValue === 'string') {
      return currentValue;
    }
    return this.props.value;
  }

  reset() {
    this.setState({ currentValue: null });
  }

  render() {
    const {
      type,
      name,
      maxLength,
      placeholder,
      disabled,
      validationStatus,
      validationMessage,
      saveStatus,
      autoCapitalize,
      autoCorrect,
      autoComplete,
      autoFocus,
      readOnly,
      required,
      spellCheck,
      tabIndex,
      modificationRequiredForValidation,
      } = this.props;

    const inputAttributes = {
      type,
      maxLength,
      placeholder,
      disabled,
      autoCapitalize,
      autoCorrect,
      autoComplete,
      autoFocus,
      readOnly,
      required,
      spellCheck,
      tabIndex,
    };

    let InputElement = 'input';
    let format = 'text';

    if (type === 'textarea') {
      InputElement = 'textarea';
    } else if (type === 'select') {
      format = 'dropdown';
      InputElement = 'select';
    }

    let children = null;
    if (type === 'select') {
      children = this.props.children;
    }

    const valueModified = (typeof this.state.currentValue === 'string');

    const error = ((valueModified || !modificationRequiredForValidation) && (validationStatus === VALIDATION_ERROR));
    const warning = ((valueModified || !modificationRequiredForValidation) && (validationStatus === VALIDATION_WARNING));
    const success = (validationStatus === VALIDATION_SUCCESS);

    return (
      <div className={classNames(
        'fancy-input-root',
        `type-${type}`,
        `format-${format}`,
        name)}>
        <div className="fancy-input-container">
          <SelectArrow show={format === 'dropdown' || type === 'date'} />
          <ErrorGlyph show={error} />
          <WarningGlyph show={warning} />
          <SuccessGlyph show={success} persistent={!saveStatus} />
          <StatusLabel
            name="saved"
            show={saveStatus}
            delay={success ? 800 : 0}
          >Saved</StatusLabel>
          <InputElement
            className={classNames(
              'fancy-input-element',
              `format-${format}`,
              `type-${type}`,
              {
                'validation-success': success,
                'validation-error': error,
                'validation-warning': warning,
              })}
            value={this.getValue()}
            onChange={this.updateCurrentValue}
            data-skip-dirty
            {...inputAttributes}
            {...this.eventHandlers}
            ref="inputElement"
          >{children}</InputElement>
          <p
            className={classNames('info-message', {
              error,
              warning,
              'show': error || warning,
            })}
          >{validationMessage}</p>
        </div>
      </div>
    );
  }
}

FancyInput.ValidationResults = {
  VALIDATION_SUCCESS,
  VALIDATION_WARNING,
  VALIDATION_ERROR,
  VALIDATION_NEUTRAL,
};

export default FancyInput;
