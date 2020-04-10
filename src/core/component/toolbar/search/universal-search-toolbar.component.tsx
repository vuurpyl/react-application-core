import * as React from 'react';
import * as R from 'ramda';

import {
  isFn,
  nvl,
  orNull,
} from '../../../util';
import {
  IFilterActionConfiguration,
  IUniversalFieldProps,
} from '../../../configurations-definitions.interface';
import { IUniversalSearchToolbarProps } from './search-toolbar.interface';
import { DelayedChangesFieldPlugin } from '../../field/field/plugin/delayed-changes-field.plugin';
import { UniversalComponent } from '../../base/universal.component';
import {
  IconsEnum,
  IFieldActionEntity,
  ToolbarToolsEnum,
} from '../../../definition';

export abstract class UniversalSearchToolbar<TProps extends IUniversalSearchToolbarProps,
                                             TState = {}>
  extends UniversalComponent<TProps> {

  /**
   * @stable [18.05.2018]
   */
  public static readonly defaultProps: IUniversalSearchToolbarProps = {
    actions: [],
    icon: 'search',
    fieldConfiguration: {
      placeholder: 'Search',
    },
  };

  /**
   * @stable [18.05.2018]
   */
  protected readonly baseActionsProps: Record<number, IFieldActionEntity> = {
    [ToolbarToolsEnum.FILTER]: {
      type: 'filter',
      onClick: this.onOpen.bind(this),
    },
    [ToolbarToolsEnum.CLEAR]: {
      type: 'close',
      onClick: this.onDeactivate.bind(this),
    },
    [ToolbarToolsEnum.REFRESH]: {type: IconsEnum.SYNC, title: this.settings.messages.refreshActionTitleMessage},
    [ToolbarToolsEnum.DOWNLOAD_FILE]: {type: 'download', title: this.settings.messages.exportActionTitleMessage},
  };

  /**
   * @stable [18.05.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onActionClick = this.onActionClick.bind(this);
  }

  /**
   * @stable [18.05.2018]
   * @returns {boolean}
   */
  protected get isActive(): boolean {
    return this.props.active;
  }

  /**
   * @stable [18.05.2018]
   * @returns {string}
   */
  protected get query(): string {
    return this.props.query;
  }

  /**
   * @stable [18.05.2018]
   */
  protected onActivate(): void {
    const props = this.props;
    if (props.notUseField) {

      // Invoke a search
      this.onApply();
    } else {
      if (props.onActivate) {

        // Open a search field
        props.onActivate();
      }
    }
  }

  /**
   * @stable [18.05.2018]
   */
  protected onDeactivate(): void {
    const props = this.props;
    if (props.onDeactivate) {
      // Close a search field
      props.onDeactivate();
    }
  }

  /**
   * @stable [18.05.2018]
   * @param {string} query
   */
  protected onChange(query?: string): void {
    const props = this.props;
    if (props.onChange) {
      props.onChange(query);
    }
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUniversalFieldProps}
   */
  protected get fieldProps(): IUniversalFieldProps {
    const props = this.props;
    return {
      autoFocus: true,
      errorMessageRendered: false,
      value: this.query,
      actions: this.actions,
      onChange: this.onChange,
      onDelay: this.onApply,
      plugins: DelayedChangesFieldPlugin,
      ...props.fieldConfiguration as {},
    };
  }

  // TODO
  protected get actions(): IFieldActionEntity[] {
    const props = this.props;
    const defaultActions: IFilterActionConfiguration[] = props.notUseField
      ? []
      : [{type: ToolbarToolsEnum.CLEAR}];

    return R.map<IFilterActionConfiguration, IFieldActionEntity>((action): IFieldActionEntity => {
      const config = this.baseActionsProps[action.type];
      return ({
        ...config,
        onClick: isFn(config.onClick) ? config.onClick : (() => this.onActionClick(action.type)),
        disabled: nvl(action.disabled, props.actionsDisabled),
        className: action.className,
      });
    }, defaultActions.concat(props.actions));
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element[]}
   */
  protected get actionsElements(): JSX.Element[] {
    let actions;
    const props = this.props;
    return []
      .concat(
        this.isActive
          ? []
          : this.getActionElement({
            key: 'toolbar-action-key',
            icon: props.icon,
            onClick: this.onActivate,
            disabled: props.actionsDisabled,
          })
      ).concat(
        props.notUseField && (actions = this.actions).length > 0
          ? actions.map((action, index) => this.getActionElement({
            ...action,
            icon: action.type,
            key: `toolbar-action-key-${index}`,
            disabled: props.actionsDisabled,
            className: action.className,
          }))
          : []
      );
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get fieldSection(): JSX.Element {
    return orNull<JSX.Element>(this.isActive, () => this.fieldWrapper);
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get actionsElementsSection(): JSX.Element[] {
    return orNull<JSX.Element[]>(this.actionsElements.length > 0, () => this.actionsElementsWrapper);
  }

  protected abstract getActionElement(config: any): JSX.Element;	// TODO

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract get fieldWrapper(): JSX.Element;

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract get actionsElementsWrapper(): JSX.Element[];

  /**
   * @stable [18.05.2018]
   */
  private onOpen(): void {
    const props = this.props;
    if (props.onOpen) {
      props.onOpen();
    }
  }

  /**
   * @stable [18.05.2018]
   */
  private onApply(): void {
    const props = this.props;
    if (props.onApply) {
      props.onApply();
    }
  }

  private onActionClick(type: ToolbarToolsEnum): void {
    const props = this.props;
    if (props.onActionClick) {
      props.onActionClick(type);
    }
  }
}
