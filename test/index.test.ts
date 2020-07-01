import {
  getCurrentEnvironment,
  Environments
} from '../lib';

interface EnvironmentConfigs {
  backendUrl: string;
};

interface EnvironmentFeatures {
  feature: boolean;
};

const environments: Environments<EnvironmentConfigs, EnvironmentFeatures> = {
  'env1': {
    name: 'Environment 1',
    hosts: ['env1.com'],
    configs: {
      backendUrl: 'https://env1.com',
    },
    features: {
      feature: false,
    }
  },
  'env2': {
    name: 'Environment 2',
    hosts: ['env2.pt'],
    configs: {
      backendUrl: 'https://env2.com',
    },
    features: {
      feature: false,
    }
  }
};

describe('getCurrentEnvironment', () => {
  let globalAny:any = global;
  delete globalAny.window.location;

  const oldEnvironmentVars = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnvironmentVars };
    globalAny.window.location = {};
  });

  it('should select environments from environment variables', () => {
    process.env.REACT_APP_ENVIRONMENT = 'env1';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 1');

    process.env.REACT_APP_ENVIRONMENT = 'env2';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 2');

    delete process.env.REACT_APP_ENVIRONMENT;

    process.env.STORYBOOK_ENVIRONMENT = 'env1';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 1');
  });

  it('should select environments from hostname', () => {
    globalAny.window.location.hostname = 'env1.com';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 1');

    globalAny.window.location.hostname = 'env2.pt';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 2');
  });

  it('should return the default environment if hosts or environment variable do not match', () => {
    globalAny.window.location.hostname = 'env1-host-does-not-match.com';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 2');

    process.env.STORYBOOK_ENVIRONMENT = 'env1-does-not-match';
    expect(getCurrentEnvironment(environments, environments.env2).name).toEqual('Environment 2');
  });
});
