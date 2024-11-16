import { Operation } from './SearchCriteria';

export type DataType = 'number' | 'string' | 'enum' | 'date' | 'dateTime' | 'boolean';

const stringOp = (op: string): Operation => {
  switch (op) {
    case 'equals':
      return 'eq';
    case 'starts with':
      return 'bw';
    case 'ends with':
      return 'ew';
    case 'contains':
      return 'cn';

    default:
      return 'eq';
  }
};

const numberOp = (op: string): Operation => {
  switch (op) {
    case 'equals':
      return 'eq';
    case 'contains':
      return 'sc';

    default:
      return 'eq';
  }
};

export const toOperation = (op: string, type?: DataType): Operation => {
  switch (type) {
    case 'number':
      return numberOp(op);
    case 'string':
      return stringOp(op);
    default:
      throw new Error(`Unknown column type ${type}`);
  }
};

export type { SearchDto } from './SearchDto';
export type { Operation, SearchCriteria } from './SearchCriteria';
