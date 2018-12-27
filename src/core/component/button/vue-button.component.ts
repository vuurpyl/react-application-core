import { Component, Prop } from 'vue-property-decorator';

import { calc, toClassName } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';

@ComponentName('vue-button')
@Component({
  template: `
    <button :class='getClassName()'
            v-on:click="onClick($event)">
      {{getText()}}
    </button>
  `,
})
class VueButton extends VueBaseComponent {
  @Prop() private text: string;

  /**
   * @stable [11.11.2018]
   * @param {MouseEvent} event
   */
  private onClick(event: MouseEvent): void {
    this.$emit('click', event);
  }

  /**
   * @stable [27.12.2018]
   * @returns {string}
   */
  private getClassName(): string {
    return toClassName('vue-button', calc(this.className));
  }

  /**
   * @stable [27.12.2018]
   * @returns {string}
   */
  private getText(): string {
    return this.t(this.text);
  }
}
