import React, {useRef, useMemo, useEffect, Suspense} from 'react';
import {extend, useThree, useFrame} from 'react-three-fiber';
import {Stage2D as PicimoStage2D, ParallaxProjection, Plane, Logger, OrthographicProjection} from 'picimo';
import {node, oneOf, object, bool, any} from 'prop-types';
import {TextureContext, useTextureContext} from '../hooks/useTexture';

extend({PicimoStage2D});

const log = new Logger('<Stage2D>', 0, Infinity);

export const Stage2D = ({children, type, plane, projection: projectionOptions, fallback, enableThreeDevtools}) => {

  const ref = useRef();

  const {setDefaultCamera, size: {width, height}, scene, renderer} = useThree();

  useEffect(() => {
    if (scene && renderer && enableThreeDevtools) {
      // Observe a scene or a renderer
      if (typeof __THREE_DEVTOOLS__ !== "undefined") {
        // eslint-disable-next-line no-undef
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: scene }));
        // eslint-disable-next-line no-undef
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: renderer }));
      }
    }
  }, [scene, renderer, enableThreeDevtools]);

  const texCtx = useTextureContext();

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
    <TextureContext.Provider value={texCtx}>
      <picimoStage2D ref={ref} projection={projection}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </picimoStage2D>
    </TextureContext.Provider>
  );
}

Stage2D.propTypes = {
  children: node,
  plane: oneOf(['xy', 'xz']).isRequired,
  type: oneOf(['orthographic', 'parallax']).isRequired,
  projection: object.isRequired,
  fallback: any,
  enableThreeDevtools: bool,
}

Stage2D.defaultProps = {
  plane: 'xy',
  type: 'orthographic',
  fallback: null,
  enableThreeDevtools: false,
}
