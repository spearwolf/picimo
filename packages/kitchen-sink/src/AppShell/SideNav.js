import styled from 'styled-components';
import { BREAKPOINT_SHOW_HAMBURGER, SIDENAV_SIZE } from './constants';

export default styled.div`
  @media (max-width: ${BREAKPOINT_SHOW_HAMBURGER - 1}px) {
    position: absolute;
    top: 0;
    left: 0;
    width: ${SIDENAV_SIZE}px;
    height: 100vh;
    z-index: 100;

    transition-duration: 0.2s;
    transition-timing-function: ease;
    transition-property: transform;
    transform: ${props => `translateX(${props.collapsed ? '-100%' : '0'})`}
  }
  @media (min-width: ${BREAKPOINT_SHOW_HAMBURGER}px) {
    flex: 0 0 ${SIDENAV_SIZE}px;
  }

  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #f8f8f8;
`;
