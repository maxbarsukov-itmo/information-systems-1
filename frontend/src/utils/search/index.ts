import { GridFilterInputValue, GridFilterModel, GridFilterOperator } from '@mui/x-data-grid-pro';
import { Operation, SearchCriteria } from 'interfaces/dto/search/SearchCriteria';
import { SearchDto } from 'interfaces/dto/search/SearchDto';

export const filterToSearchDto = (filter: GridFilterModel): SearchDto => {
  const searchCriteria: SearchCriteria[] = filter.items
    .filter(item => item.operatorValue.startsWith('special') || item.operatorValue === 'nu' || item.operatorValue === 'nn' || !!item.value)
    .map(item => {
      const specOp = getSpecialOperators(item.operatorValue);
      return {
        filterKey: item.columnField,
        value: specOp?.value || item.value || '',
        operation: (specOp?.operatorValue || item.operatorValue) as Operation,
      };
    });
  return {
    searchCriteriaList: searchCriteria,
    dataOption: (filter.linkOperator === 'and' ? 'all' : 'any'),
  };
};

export const getSpecialOperators = (operator: string) => {
  const specialOps = {
    'special_truth': {
      value: true,
      operation: 'eq',
    },
    'special_false': {
      value: false,
      operation: 'eq',
    },
  };
  return specialOps[operator];
};

const getApplyFilterFn = (filterItem, _column) => {
  if (!filterItem.columnField || !filterItem.value || !filterItem.operatorValue) {
    return null;
  }
  return () => false;
};

// For 'string'
export const getStringFilterOperations = (): GridFilterOperator[] => {
  const InputComponentProps = { type: 'string' };
  const operators: GridFilterOperator[] = [
    {
      // case "eq" -> EQUAL;
      label: '= equals',
      value: 'eq',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "ne" -> NOT_EQUAL;
      label: '≠ not equals',
      value: 'ne',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "cn" -> CONTAINS;
      label: '∋ contains',
      value: 'cn',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "nc" -> DOES_NOT_CONTAIN;
      label: '∌ not contains',
      value: 'nc',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "bw" -> BEGINS_WITH;
      label: 'Az... starts with',
      value: 'bw',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "bn" -> DOES_NOT_BEGIN_WITH;
      label: '¬Az.. not starts with',
      value: 'bn',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "ew" -> ENDS_WITH;
      label: '...Az ends with',
      value: 'ew',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "en" -> DOES_NOT_END_WITH;
      label: '¬..Az not ends with',
      value: 'en',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "gt" -> GREATER_THAN;
      label: '>',
      value: 'gt',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "ge" -> GREATER_THAN_EQUAL;
      label: '⩾',
      value: 'ge',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "lt" -> LESS_THAN;
      label: '<',
      value: 'lt',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "le" -> LESS_THAN_EQUAL;
      label: '⩽',
      value: 'le',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "nu" -> NUL;
      label: '∅ is empty',
      value: 'nu',
      getApplyFilterFn,
      InputComponentProps,
    },
    {
      // case "nn" -> NOT_NULL;
      label: '≠∅ is present',
      value: 'nn',
      getApplyFilterFn,
      InputComponentProps,
    },
  ];

  return operators;
};

// For 'enumValue'
export const getEnumValueFilterOperations = (): GridFilterOperator[] => {
  const InputComponentProps = { type: 'singleSelect' };
  const operators: GridFilterOperator[] = [
    {
      // case "se" -> STR_EQUAL;
      label: '= equals',
      value: 'se',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "sn" -> STR_NOT_EQUAL;
      label: '≠ not equals',
      value: 'sn',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "sc" -> STR_CONTAINS;
      label: '∋ contains',
      value: 'sc',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps: { type: 'string' },
    },
    {
      // case "sd" -> STR_DOES_NOT_CONTAIN;
      label: '∌ not contains',
      value: 'sd',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps: { type: 'string' },
    },
    {
      // case "nu" -> NUL;
      label: '∅ is empty',
      value: 'nu',
      getApplyFilterFn,
    },
    {
      // case "nn" -> NOT_NULL;
      label: '≠∅ is present',
      value: 'nn',
      getApplyFilterFn,
    },
  ];

  return operators;
};

// For 'dateTime'
export const getDateTimeFilterOperations = (): GridFilterOperator[] => {
  const InputComponentProps = { type: 'datetime-local' };
  const operators: GridFilterOperator[] = [
    {
      // case "be" -> BEFORE;
      label: '🢨 before',
      value: 'be',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "af" -> AFTER;
      label: '🢩 after',
      value: 'af',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "sc" -> STR_CONTAINS;
      label: '∋ contains',
      value: 'sc',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps: { type: 'string' },
    },
    {
      // case "sd" -> STR_DOES_NOT_CONTAIN;
      label: '∌ not contains',
      value: 'sd',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps: { type: 'string' },
    },
    {
      // case "eq" -> EQUAL;
      label: '= equals',
      value: 'eq',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "ne" -> NOT_EQUAL;
      label: '≠ not equals',
      value: 'ne',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "nu" -> NUL;
      label: '∅ is empty',
      value: 'nu',
      getApplyFilterFn,
    },
    {
      // case "nn" -> NOT_NULL;
      label: '≠∅ is present',
      value: 'nn',
      getApplyFilterFn,
    },
  ];

  return operators;
};

// For 'boolean'
export const getBooleanFilterOperations = (): GridFilterOperator[] => {
  const InputComponentProps = { type: 'boolean' };
  const operators: GridFilterOperator[] = [
    {
      // case "eq" -> EQUAL;
      label: '⊤ truth',
      value: 'special_truth',
      getApplyFilterFn,
      InputComponentProps,
    },
    {
      // case "eq" -> EQUAL;
      label: '⊥ false',
      value: 'special_false',
      getApplyFilterFn,
      InputComponentProps,
    },
    {
      // case "nu" -> NUL;
      label: '∅ is empty',
      value: 'nu',
      getApplyFilterFn,
      InputComponentProps,
    },
    {
      // case "nn" -> NOT_NULL;
      label: '≠∅ is present',
      value: 'nn',
      getApplyFilterFn,
      InputComponentProps,
    },
  ];

  return operators;
};

// For 'number'
export const getNumberFilterOperations = (): GridFilterOperator[] => {
  const InputComponentProps = { type: 'number' };
  const operators: GridFilterOperator[] = [
    {
      // case "eq" -> EQUAL;
      label: '=',
      value: 'eq',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "ne" -> NOT_EQUAL;
      label: '≠',
      value: 'ne',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "gt" -> GREATER_THAN;
      label: '>',
      value: 'gt',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "ge" -> GREATER_THAN_EQUAL;
      label: '⩾',
      value: 'ge',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "lt" -> LESS_THAN;
      label: '<',
      value: 'lt',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "le" -> LESS_THAN_EQUAL;
      label: '⩽',
      value: 'le',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "sc" -> STR_CONTAINS;
      label: '∋ contains',
      value: 'sc',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "sd" -> STR_DOES_NOT_CONTAIN;
      label: '∌ not contains',
      value: 'sd',
      getApplyFilterFn,
      InputComponent: GridFilterInputValue,
      InputComponentProps,
    },
    {
      // case "nu" -> NUL;
      label: '∅ is empty',
      value: 'nu',
      getApplyFilterFn,
    },
    {
      // case "nn" -> NOT_NULL;
      label: '≠∅ is present',
      value: 'nn',
      getApplyFilterFn,
    },
  ];

  return operators;
};

export type { SearchDto } from 'interfaces/dto/search/SearchDto';
export type { Operation, SearchCriteria } from 'interfaces/dto/search/SearchCriteria';
