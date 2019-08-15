import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './hamburger.scss';

const Container = styled.div`
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-property: transform;

  .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
    background-color: ${props => `${props.active ? props.activeColor : props.color}`};
  }
`;

const Button = styled.button`
  outline: none;
`;

const Hamburger = ({
  type,
  active,
  className,
  onClick,
  color,
  activeColor,
}) => (
  <Container className={className} active={active} color={color} activeColor={activeColor}>
    <Button onClick={onClick} className={`hamburger hamburger--${type}${active ? ' is-active' : ''}`} type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </Button>
  </Container>
);

Hamburger.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  activeColor: PropTypes.string,
};

Hamburger.defaultProps = {
  type: 'collapse',
  active: false,
  className: '',
  color: '#fff',
  activeColor: '#333',
};

export default Hamburger;
