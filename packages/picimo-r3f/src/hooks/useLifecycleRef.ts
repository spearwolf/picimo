// inspired by https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
import {useCallback, useRef, useEffect, DependencyList} from "react";

export const useLifecycleRef = (
  {
    onCreate,
    onDestroy,
    onUpdate
  }: {
    onCreate: (node: any) => void;
    onDestroy: (node: any) => void;
    onUpdate: (node: any) => void;
  },
  updateDependents: DependencyList = []
) => {
  const ref = useRef(null);

  let onCreateCalled = false;

  const setRef = useCallback(node => {
    if (ref.current && onDestroy) {
      onDestroy(ref.current);
    }

    if (node && onCreate) {
      onCreate(node);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      onCreateCalled = true;
    }

    ref.current = node;
  }, []);

  useEffect(() => {
    if (onUpdate && !onCreateCalled && ref.current) {
      onUpdate(ref.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onUpdate, onCreateCalled, ...updateDependents]);

  return [setRef, ref.current];
};
