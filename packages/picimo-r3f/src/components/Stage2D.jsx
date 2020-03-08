import {
  Stage2D as PicimoStage2D,
  ParallaxProjection,
  Plane,
  Logger,
  OrthographicProjection,
} from 'picimo';
import {node, oneOf, object, bool, any} from 'prop-types';
import React, {useRef, useMemo, useEffect, Suspense, useState} from 'react';
import {extend, useThree, useFrame} from 'react-three-fiber';

import {TextureContext, useTextureContext, ProjectionContext} from '../hooks';

extend({PicimoStage2D});

const log = new Logger('picimo-r3f.<Stage2D>');

export const Stage2D = ({
  children,
  type,
  plane,
  projection: projectionOptions,
  fallback,
  enableThreeDevtools,
  disableCamera,
}) => {
  const ref = useRef();

  const {
    setDefaultCamera,
    size: {width, height},
    scene,
    renderer,
  } = useThree();

  useEffect(() => {
    if (scene && renderer && enableThreeDevtools) {
      // Observe a scene or a renderer
      if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
        // eslint-disable-next-line no-undef
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent('observe', {detail: scene}),
        );
        // eslint-disable-next-line no-undef
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent('observe', {detail: renderer}),
        );
      }
    }
  }, [scene, renderer, enableThreeDevtools]);

  const texCtx = useTextureContext();

  const [projCtx, setProjCtx] = useState(null);

  const projection = useMemo(() => {
    const proj = new (type === 'parallax'
      ? ParallaxProjection
      : OrthographicProjection)(new Plane(plane), projectionOptions);
    setProjCtx(proj);
    log.log('create projection:', proj);
    return proj;
  }, [plane, type, projectionOptions]);

  useEffect(() => {
    const stage = ref.current;
    const {projection} = stage;
    log.log('init stage->projection', stage);
    projection.update(width, height);
    if (!disableCamera) {
      setDefaultCamera(projection.camera);
    }
  }, [projection, width, height, setDefaultCamera, disableCamera]);

  useFrame(({size: {width, height}}) => {
    log.log('width=', width, 'height=', height);
    projection.update(width, height);
  });

  return (
    <TextureContext.Provider value={texCtx}>
      <picimoStage2D ref={ref} projection={projection}>
        <ProjectionContext.Provider value={projCtx}>
          <Suspense fallback={fallback}>{children}</Suspense>
        </ProjectionContext.Provider>
      </picimoStage2D>
    </TextureContext.Provider>
  );
};

Stage2D.propTypes = {
  children: node,
  plane: oneOf(['xy', 'xz']).isRequired,
  type: oneOf(['orthographic', 'parallax']).isRequired,
  projection: object.isRequired,
  fallback: any,
  disableCamera: bool,
  enableThreeDevtools: bool,
};

Stage2D.defaultProps = {
  plane: 'xy',
  type: 'orthographic',
  fallback: null,
  projection: {pixelZoom: 2.0},
  disableCamera: false,
  enableThreeDevtools: false,
};
