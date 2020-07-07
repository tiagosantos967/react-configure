import React from 'react';

import generateFeatureFlagComponent, { FeatureFlagProps } from './generateFeatureFlagComponent';

type FeatureFlags<F> = {
  [key in keyof F]: boolean;
}
export interface Environment<C, F> {
  name: string;
  hosts?: string[];
  configs: C;
  features: FeatureFlags<F>;
}

export type Environments<C, F> = {
  [key: string]: Environment<C, F>;
};

const findEnvironmentsWithCurrentHost = <C, F>(environments: Environments<C, F>) => (
  Object.keys(environments).find((key) => {
    const environment = environments[key];
    const hosts = environment.hosts;
    
    return hosts?.includes(window.location.hostname) ? true : false;
  })
);

export const getCurrentEnvironment = <C, F>(
  environments: Environments<C, F>,
  defaultEnvironment: Environment<C, F>,
): Environment<C, F> & { FeatureFlag: React.FC<FeatureFlagProps<F>> }  => {
  const envWithHosts = findEnvironmentsWithCurrentHost(environments);
  const envVarEnvironment = process.env.REACT_APP_ENVIRONMENT || process.env.STORYBOOK_ENVIRONMENT;

  let selectedEnvironment = defaultEnvironment;

  if (envWithHosts){
    selectedEnvironment = environments[envWithHosts];
  }

  if(envVarEnvironment && environments[envVarEnvironment]){
    selectedEnvironment = environments[envVarEnvironment];
  }

  return {
    ...selectedEnvironment,
    FeatureFlag: generateFeatureFlagComponent(selectedEnvironment.features)
  };
};
