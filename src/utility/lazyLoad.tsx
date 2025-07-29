import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';

export function lazyLoad<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback: ReactNode = null
): React.FC<React.ComponentProps<T>> {
  const LazyComponent = lazy(factory);

  const WrappedComponent: React.FC<React.ComponentProps<T>> = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return WrappedComponent;
}
