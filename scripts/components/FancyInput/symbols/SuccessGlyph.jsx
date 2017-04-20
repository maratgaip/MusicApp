import React from 'react';
import classNames from 'classnames';

const SuccessGlyph = props => (
  <div className={ classNames(
    'fancy-input-status',
    'status-success',
    {
      'show': props.show,
      'persistent': props.persistent
    } ) }>
    <svg className="glyph success-glyph" viewBox="0 0 30 30">
      <path className="checkmark" d="M26.5 7.5L10.808 23.192l-7.5-7.5"/>
    </svg>
  </div>
);

SuccessGlyph.propTypes = {
  show: React.PropTypes.bool.isRequired,
  persistent: React.PropTypes.bool.isRequired
};

export { SuccessGlyph };
