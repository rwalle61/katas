import { Direction } from './Direction';
import { ObjectName } from './ObjectName';

export type Door = {
  name: ObjectName;
  direction: Direction;
  locked?: boolean;
};
