import {
  Stage2D as PicimoStage2D,
  ParallaxProjection,
  Plane,
  Logger,
  OrthographicProjection,
} from 'picimo';
import {node, oneOf, object, bool, any, number} from 'prop-types';
import React, {useRef, useMemo, useEffect, Suspense, useState} from 'react';
import {extend, useThree, useFrame} from 'react-three-fiber';

import {TextureContext, useTextureContext, ProjectionContext} from '../hooks';

extend({PicimoStage2D});

const log = new Logger('picimo-r3f.<Stage2D>');

export const Stage2D = ({
  children,
  disableCamera,
  distance,
  enableThreeDevtools,
  fallback,
  far,
  fit,
  height: projectionHeight,
  near,
  pixelZoom,
  plane,
  projection: projectionOptions,
  type,
  width: projectionWidth,
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
    const options = projectionOptions || {
      near,
      far,
      distance,
      ...(pixelZoom > 0
        ? {pixelZoom}
        : width > 0 || height > 0
        ? {
            width: projectionWidth,
            height: projectionHeight,
            fit,
          }
        : {pixelZoom: 2}),
    };
    const proj = new (type === 'parallax'
      ? ParallaxProjection
      : OrthographicProjection)(new Plane(plane), options);
    setProjCtx(proj);
    if (log.DEBUG) log.log('created projection:', proj);
    return proj;
  }, [
    projectionOptions,
    near,
    far,
    distance,
    pixelZoom,
    width,
    height,
    projectionWidth,
    projectionHeight,
    fit,
    type,
    plane,
  ]);

  useEffect(() => {
    const stage = ref.current;
    const {projection} = stage;
    if (log.DEBUG) log.log('init stage->projection', stage);
    projection.update(width, height);
    if (!disableCamera) {
      setDefaultCamera(projection.camera);
    }
  }, [projection, width, height, setDefaultCamera, disableCamera]);

  useFrame(({size: {width, height}}) => {
    if (log.DEBUG) log.log('width=', width, 'height=', height);
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
  disableCamera: bool,
  distance: number,
  enableThreeDevtools: bool,
  fallback: any,
  far: number,
  fit: oneOf(['contain', 'cover', 'fill']),
  height: number,
  near: number,
  pixelZoom: number,
  plane: oneOf(['xy', 'xz']).isRequired,
  projection: object,
  type: oneOf(['orthographic', 'parallax']).isRequired,
  width: number,
};

Stage2D.defaultProps = {
  disableCamera: false,
  distance: 300,
  enableThreeDevtools: false,
  fallback: null,
  far: 100000,
  fit: 'contain',
  height: undefined,
  near: 0.1,
  pixelZoom: undefined,
  plane: 'xy',
  projection: null,
  type: 'orthographic',
  width: undefined,
};
