import { useEffect } from 'react';
import usePrevious from './usePrevious';

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((acc, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...acc,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      };
    }

    return acc;
  }, {});

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger] ', changedDeps);
    console.log('[use-effect-debugger] ', JSON.stringify(changedDeps));
  }

  useEffect(effectHook, dependencies);
};

export default useEffectDebugger;
