import * as React from 'react';
import * as R from 'ramda';

import { calc, isPrimitive, uuid, ifNotNilThanValue } from '../util';
import { IEntity, UNDEF_SYMBOL } from '../definitions.interface';

/**
 * @stable [24.01.2019]
 * @param {TEntity} entity
 * @returns {TEntity}
 */
export const shallowClone = <TEntity extends IEntity>(entity: TEntity): TEntity =>
  ifNotNilThanValue(entity, (): TEntity => ({...entity as {}} as TEntity), UNDEF_SYMBOL);

/**
 * @stable [14.06.2018]
 * @param {T} o
 * @returns {T}
 */
export const clone = <T>(o: T): T => R.clone<T>(o);

export type RenderPredicateT = (child: JSX.Element) => boolean;

export const cloneReactNodes = <TProps>(component: JSX.Element | React.Component<{}>,
                                        mergedProps: TProps | ((component: JSX.Element | React.Component<{}>) => TProps),
                                        mergePropsPredicate: RenderPredicateT,
                                        renderPredicate?: RenderPredicateT): React.ReactNode[] =>
  React.Children.map<React.ReactNode, React.ReactNode>(
    component.props.children,
    (child) => {
      if (R.isNil(child)) {
        return null;
      } else if (isPrimitive(child)) {
        return child;
      } else {
        const reactChild = child as React.FunctionComponentElement<{ children: React.ReactChild[] }>;
        const ref = reactChild.ref || uuid();
        const canMergeProps = mergePropsPredicate(reactChild);

        const canRender = renderPredicate ? renderPredicate(reactChild) : true;
        if (!R.isNil(canRender) && !canRender) {
          return null;
        }
        return React.cloneElement<React.Props<TProps>>(
          reactChild,
          {
            ...(canMergeProps && {
              ref,
              ...calc<TProps>(mergedProps, reactChild) as {},
            }),
            children: cloneReactNodes<TProps>(reactChild, mergedProps, mergePropsPredicate, renderPredicate),
          }
        );
      }
    },
  );
