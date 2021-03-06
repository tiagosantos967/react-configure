# react-configure

## Lightweight library to handle your React app static configs and feature-flags

This library lets you define:
- Static configurations like `backendUrl`;
- Feature-flags like `enableChat`, `enableCommentsSection`; 
- Multiple environments, each with its own configuration, like `dev`, `qa`, `prod`, etc.

It also selects which environment your application is running on based on:
1. Environment variable* (`REACT_APP_ENVIRONMENT` or `STORYBOOK_ENVIRONMENT`);
2. Current hostname like `www.test.com`, `dev.test.com`, etc;

*If one the the specified environment variables is defined, the library will ignore the hostname

By using this library you only have to define your configurations and use them. The library will select the correct environment, configs and feature-flags for you.

## Install

```bash
npm i --save react-configure
```

## Setup

Using typescript

configuration.ts

```typescript
import {
  Environments,
  getCurrentEnvironment
} from 'react-configure';

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

```

## Usage

```typescript
import React from 'react';
import { configs, FeatureFlag } from './configuration.ts';

console.log(`Current backend url is ${configs.backendUrl}`);

export const MyComponent = (): React.FC => (
  <FeatureFlag flag="enableChat">
    <p>Chat is enabled!</p>
  </FeatureFlag>
);

```
