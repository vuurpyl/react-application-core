import { AnyAction } from 'redux';
import * as R from 'ramda';

import {
  STACK_LOCK_ACTION_TYPE,
  STACK_POP_ACTION_TYPE,
  STACK_PUSH_ACTION_TYPE,
  STACK_REMOVE_ACTION_TYPE,
} from './stack.interface';
import {
  INITIAL_STACK_ENTITY,
  IStackEntity,
  IStackItemEntity,
  IStackPayloadEntity,
} from '../../definition';
import {
  findStackEntityIndex,
  getAdditionalStackSectionsToDestroy,
} from './stack.support';

/**
 * @stable [20.09.2019]
 * @param {IStackEntity} state
 * @param {AnyAction} action
 * @returns {IStackEntity}
 */
export const stackReducer = (state: IStackEntity = INITIAL_STACK_ENTITY,
                             action: AnyAction): IStackEntity => {
  const stack = state.stack;
  const payloadEntity: IStackPayloadEntity = action.data;
  const previousSection: string = action.data;
  const sectionsToDestroy: string[] = action.data;

  switch (action.type) {
    /**
     * @stable [21.09.2019]
     */
    case STACK_REMOVE_ACTION_TYPE:
      return {
        ...state,
        stack: R.filter<IStackItemEntity>((entry) => !sectionsToDestroy.includes(entry.section), stack)
          .map(
            (itm): IStackItemEntity =>
              ({
                ...itm,
                linkedSections: itm.linkedSections.filter((linkedSection) => !sectionsToDestroy.includes(linkedSection)),
              })
          ),
      };
    /**
     * @stable [20.09.2019]
     * Is called from componentDidMount
     */
    case STACK_PUSH_ACTION_TYPE:
      const pushSection = payloadEntity.section;      // Next section
      const pushUrl = payloadEntity.url;              // Next section url (url path)
      return {
        ...state,
        destroySections: INITIAL_STACK_ENTITY.destroySections,      // Auto reset
        ...(
          findStackEntityIndex(pushSection, state) > -1             // If already inserted
            ? {}
            : {
              stack: [
                ...stack,
                {section: pushSection, url: pushUrl, linkedSections: []}
              ],
            }
        ),
      };
    /**
     * @stable [20.09.2019]
     * Is called from componentWillUnmount
     */
    case STACK_POP_ACTION_TYPE:
      const additionalSectionsToDestroy = getAdditionalStackSectionsToDestroy(previousSection, state);
      return {
        ...state,
        lock: INITIAL_STACK_ENTITY.lock,                            // Auto reset
        destroySections: INITIAL_STACK_ENTITY.destroySections,      // Auto reset
        ...(
          state.lock
            ? {}  // If there is a lock - do nothing
            : {
              stack: stack
                .slice(0, findStackEntityIndex(previousSection, state) + 1)
                .map((itm): IStackItemEntity =>
                  ({
                    ...itm,
                    linkedSections: itm.linkedSections.filter((itm0) => !additionalSectionsToDestroy.includes(itm0)),
                  })),
              destroySections: additionalSectionsToDestroy,  // The sections will be destroyed on PUSH event
            }
        ),
      };
    /**
     * @stable [21.09.2019]
     */
    case STACK_LOCK_ACTION_TYPE:
      const nextSection: string = action.data;
      return {
        ...state,
        lock: true,
        // If there is a lock - we should attach the next section to linked sections
        stack: stack.map<IStackItemEntity>((entry, index): IStackItemEntity => (
          index === stack.length - 1
            ? {
              ...entry,
              linkedSections: Array.from(
                new Set(
                  entry.linkedSections.concat(nextSection)
                    .filter((section) => section !== entry.section) // Prevent the recursive links
                )
              ),
            }
            : entry
        )),
      };
  }
  return state;
};
