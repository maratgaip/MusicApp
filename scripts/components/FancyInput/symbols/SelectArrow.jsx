import React from 'react';
import classNames from 'classnames';

const SelectArrow = props => (
  <div className={ classNames( 'fancy-input-control', 'control-arrow', { 'show': props.show } ) }>
    <svg className="glyph select-arrow" viewBox="0 0 24 24">
        <path d="M16.411 9.275l-5.07 5.12h1.317l-5.07-5.12a.924.924 0 0 0-1.315 0 .947.947 0 0 0 0 1.33l5.069 5.12a.924.924 0 0 0 1.316 0l5.07-5.12a.947.947 0 0 0 0-1.33.924.924 0 0 0-1.317 0z" fill="currentColor"/>
    </svg>
  </div>
);

SelectArrow.propTypes = {
  show: React.PropTypes.bool.isRequired
};

export { SelectArrow };
