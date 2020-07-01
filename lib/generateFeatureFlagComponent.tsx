import React from 'react';

export interface FeatureFlagProps<F> {
  flag: keyof F;
}

const generateFeatureFlagComponent = <F extends {}>(flags: F): React.FC<FeatureFlagProps<F>> => ({
  flag,
  children,
}) => ( flags[flag] ? <>{children}</> : <></> );

export default generateFeatureFlagComponent;
