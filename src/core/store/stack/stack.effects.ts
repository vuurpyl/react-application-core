import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton } from '../../di';
import { ListActionBuilder } from '../../component/action.builder';
import {
  FilterActionBuilder,
  FormActionBuilder,
  StackActionBuilder,
  TabPanelActionBuilder,
} from '../../action';
import { getAllIndependentStackSections } from './stack.support';
import {
  $RAC_STACK_PUSH_ACTION_TYPE,
  IFluxStackEntity,
  IStoreEntity,
} from '../../definition';

@provideInSingleton(StackEffects)
export class StackEffects {
  private static logger = LoggerFactory.makeLogger('StackEffects');

  @EffectsService.effects($RAC_STACK_PUSH_ACTION_TYPE)
  public $onStackPush(action: IEffectsAction, state: IStoreEntity): IEffectsAction[] {
    const payload: IFluxStackEntity = action.data;
    const destroyableSections = getAllIndependentStackSections(payload.section, state.stack);

    if (destroyableSections.length) {
      StackEffects.logger.debug(`[$StackEffects][$onStackPush] The sections to destroy: [${destroyableSections}]`);

      return [StackActionBuilder.buildRemoveAction(...destroyableSections)]
        .concat(this.buildActionsToDestroy(destroyableSections));
    }
    return null;
  }

  private buildActionsToDestroy(sectionsToDestroy: string[]): IEffectsAction[] {
    return sectionsToDestroy.map((section) => ListActionBuilder.buildDestroyAction(section))
      .concat(sectionsToDestroy.map((section) => FormActionBuilder.buildDestroyAction(section)))
      .concat(sectionsToDestroy.map((section) => FilterActionBuilder.buildDestroyAction(section)))
      .concat(sectionsToDestroy.map((section) => TabPanelActionBuilder.buildDestroyAction(section)));
  }
}
