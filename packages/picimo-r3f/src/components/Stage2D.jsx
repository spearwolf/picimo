import React, {useRef, useMemo, useEffect} from 'react';
import {extend, useThree, useFrame} from 'react-three-fiber';
import {Stage2D as PicimoStage2D, ParallaxProjection, Plane, Logger, OrthographicProjection} from 'picimo';
import {node, oneOf, object} from 'prop-types';

extend({PicimoStage2D});

const log = new Logger('<Stage2D>', 0, Infinity);

export const Stage2D = ({children, type, plane, projection: projectionOptions}) => {

  const ref = useRef();

  const {setDefaultCamera, size: {width, height}} = useThree();

  const projection = useMemo(() => {
    const proj = new (type === 'parallax' ? ParallaxProjection : OrthographicProjection)(
      new Plane(plane),
      projectionOptions,
    );
    log.log('create projection:', proj);
    return proj;
  }, [plane, type, projectionOptions]);

  useEffect(() => {
    const stage = ref.current;
    const {projection} = stage;
    log.log('init stage->projection', stage);
    projection.update(width, height);
    setDefaultCamera(projection.camera);
  }, [projection, width, height, setDefaultCamera]);

  useFrame(({size: {width, height}}) => {
    log.log('width=', width, 'height=', height);
    projection.update(width, height);
  });

  return (
    <picimoStage2D ref={ref} projection={projection}>
      {children}
    </picimoStage2D>
  );
}

Stage2D.propTypes = {
  children: node,
  plane: oneOf(['xy', 'xz']).isRequired,
  type: oneOf(['orthographic', 'parallax']).isRequired,
  projection: object.isRequired,
}

Stage2D.defaultProps = {
  plane: 'xy',
  type: 'orthographic',
}
