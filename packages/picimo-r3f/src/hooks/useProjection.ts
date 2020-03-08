import {IProjection} from 'picimo';
import {useContext, createContext} from 'react';

export const ProjectionContext = createContext<IProjection>(null);

export const useProjection = () => {
  return useContext(ProjectionContext);
};
