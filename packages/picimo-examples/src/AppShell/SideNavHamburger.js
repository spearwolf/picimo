import styled from 'styled-components';
import Hamburger from './Hamburger';
import { BREAKPOINT_SHOW_HAMBURGER, SIDENAV_SIZE, HAMBURER_SIZE } from './constants';

export default styled(Hamburger)`
  position: absolute;
  top: 0;
  left: ${SIDENAV_SIZE}px;
  transform: ${props => (props.active ? 'translateX(-70px)' : 'translateX(0)')};
  width: ${HAMBURER_SIZE}px;
  height: ${HAMBURER_SIZE}px;
  z-index: 200;

  @media (min-width: ${BREAKPOINT_SHOW_HAMBURGER}px) {
    visibility: hidden;
  }
`;
