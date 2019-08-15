import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import svgSW from './triangle-sw.svg';
import svgSE from './triangle-se.svg';
// import svgNW from './triangle-nw.svg';
import svgNE from './triangle-ne.svg';
import svgQuad from './quad.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
`;

const Content = styled.div`
  position: absolute;
  top: ${props => props.top || 0};
  bottom: ${props => props.bottom || 0};
  right: ${props => props.right || 0};
  left: ${props => props.left || 0};
`;

const Svg = styled.div`
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
`;

const TriangleSW = Svg.extend`
  background-image: url('${svgSW}');
  bottom: ${props => props.bottom || 0};
  right: ${props => props.right || 0};
  left: ${props => props.left || 0};
  height: ${props => props.height};
`;

const TriangleSW2 = Svg.extend`
  background-image: url('${svgSW}');
  bottom: ${props => props.bottom || 0};
  top: ${props => props.top || 0};
  left: ${props => props.left || 0};
  width: ${props => props.width};
`;

const QuadSW = Svg.extend`
  background-image: url('${svgQuad}');
  left: 0;
  bottom: 0;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const TriangleSE = Svg.extend`
  background-image: url('${svgSE}');
  top: ${props => props.top || 0};
  right: ${props => props.right || 0};
  bottom: ${props => props.bottom || 0};
  width: ${props => props.width};
`;

const TriangleNE = Svg.extend`
  background-image: url('${svgNE}');
  top: ${props => props.top || 0};
  right: ${props => props.right || 0};
  left: ${props => props.left || 0};
  height: ${props => props.height};
`;

// const TriangleNW = Svg.extend`
//   background-image: url('${svgNW}');
// `;

const QuadN = Svg.extend`
  background-image: url('${svgQuad}');
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.height};
`;

const QuadS = Svg.extend`
  background-image: url('${svgQuad}');
  left: 0;
  right: 0;
  bottom: 0;
  height: ${props => props.height};
`;

const QuadE = Svg.extend`
  background-image: url('${svgQuad}');
  right: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.width};
`;

const QuadW = Svg.extend`
  background-image: url('${svgQuad}');
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.width};
`;

const BevelledEdges = ({
  north,
  east,
  south,
  west,
  northOffset,
  eastOffset,
  southOffset,
  westOffset,
}) => (
  <Container>
    { northOffset && <QuadN height={northOffset} /> }
    { eastOffset && <QuadE width={eastOffset} /> }
    { southOffset && <QuadS height={southOffset} /> }
    { westOffset && <QuadW width={westOffset} /> }
    <Content top={northOffset} right={eastOffset} bottom={southOffset} left={westOffset}>
      { north && east && (
        <Fragment>
          <TriangleNE height={north} />
          <TriangleSE width={east} top={north} />
        </Fragment>
      )}
      { south && west && (
        <Fragment>
          <TriangleSW height={south} left={west} right={east} />
          <QuadSW width={west} height={south} />
          <TriangleSW2 width={west} bottom={south} />
        </Fragment>
      )}
    </Content>
  </Container>
);

BevelledEdges.propTypes = {
  north: PropTypes.string,
  south: PropTypes.string,
  east: PropTypes.string,
  west: PropTypes.string,
  northOffset: PropTypes.string,
  southOffset: PropTypes.string,
  eastOffset: PropTypes.string,
  westOffset: PropTypes.string,
};

BevelledEdges.defaultProps = {
  north: undefined,
  south: undefined,
  east: undefined,
  west: undefined,
  northOffset: undefined,
  southOffset: undefined,
  eastOffset: undefined,
  westOffset: undefined,
};

export default BevelledEdges;
