import {
  Environments,
  getCurrentEnvironment
} from '../packages/react-configure/lib';

interface EnvironmentConfigs {
  backendUrl: string;
};

interface FeatureFlags {
  enableChat: boolean;
};

const environments: Environments<EnvironmentConfigs, FeatureFlags> = {
  'dev': {
    name: 'Development',
    hosts: [ 'localhost', 'dev.tmasantos.com' ],
    configs: {
      backendUrl: 'http://localhost:3030',
    },
    features: {
      enableChat: true,
    }
  },
  'prod': {
    name: 'Production',
    hosts: [ 'www.tmasantos.com', 'tmasantos.com' ],
    configs: {
      backendUrl: 'http://api.tmasantos.com',
    },
    features: {
      enableChat: false,
    }
  }
};

const currentEnvironment = getCurrentEnvironment(
  environments,
  environments.prod,
);

export const FeatureFlag = currentEnvironment.FeatureFlag;
export const configs = currentEnvironment.configs;
export const features = currentEnvironment.features;
