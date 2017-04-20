import React from 'react';
import classNames from 'classnames';

const setDelay = delay => ( {
  animationDelay: `${delay}ms`,
  WebkitAnimationDelay: `${delay}ms`,
  transitionDelay: `${delay}ms`,
  WebkitTransitionDelay: `${delay}ms`
} );

const StatusLabel = props => {
  let delay = props.delay || 0;
  if( typeof props.children === 'string' ) {
    const letters = props.children.split( '' ).map( char => {
      delay += 100;
      return (
        <span
          className="letter"
          style={ setDelay( delay ) }
          key={ `letter-${char}` }>{ char }</span> );
    } );
    return (
      <div className={ classNames(
        'fancy-input-status',
        'status-label',
        props.name,
        { 'show': props.show } ) }>
        <p className="label-text">{ letters }</p>
      </div>
    );
  }
  return null;
};

StatusLabel.propTypes = {
  delay: React.PropTypes.number,
  children: React.PropTypes.string,
  name: React.PropTypes.string,
  show: React.PropTypes.bool
};

export { StatusLabel };
