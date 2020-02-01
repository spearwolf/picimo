import {useContext, createContext} from 'react';
import {IProjection} from 'picimo';

export const ProjectionContext = createContext<IProjection>(null);

export const useProjection = () => {
  return useContext(ProjectionContext);
}
