import { mount } from '@vue/test-utils';
import {describe, it, expect} from "vitest"
import Form from './Form.vue'; // name of your Vue component
import LogoTwitter from '../Logo/Twitter.vue';
import UIButton from '../UI/Button.vue';
import UIInput from '../UI/Input.vue';

describe('Testing Auth Form', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Form, {
            global: {
              components: {
                'LogoTwitter': LogoTwitter,
                'UIInput': UIInput,
                'UIButton': UIButton,
              }
            }
          });
    });
    
    it('should mount without any errors', function () {
        expect(console.error).not.to.have.been.called;
    });
});