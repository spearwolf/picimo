import styled from 'styled-components';
import { FONT_FAMILY_TEXT } from './constants';

export default styled.a`
  display: block;
  font-family: '${FONT_FAMILY_TEXT}', Courier, monospace;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  color: ${props => (props.active ? '#FF3060' : '#28C')};
  background-color: ${props => (props.active ? '#ffe8e7' : 'transparent')};
  padding: 5px 14px 3px 35px;
  border-radius: 16px;
  margin-left: -33px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
