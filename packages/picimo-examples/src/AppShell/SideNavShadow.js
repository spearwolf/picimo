import styled from 'styled-components';
import { BREAKPOINT_SHOW_HAMBURGER } from './constants';

export default styled.div`
  transition-duration: 0.15s;
  transition-timing-function: ease;
  transition-property: width;

  @media (max-width: ${BREAKPOINT_SHOW_HAMBURGER - 1}px) {
    position: fixed;
    top: 0;
    left: 0;
    width: ${props => `${props.show ? '100vw' : 0}`};
    height: 100vh;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (min-width: ${BREAKPOINT_SHOW_HAMBURGER}px) {
    display: none;
  }
`;
