import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import TodoTextInput from '../../src/components/TodoTextInput'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

const setup = propOverrides => {
  const props = Object.assign({
    onSave: jest.fn(),
    text: 'Use Redux',
    placeholder: 'What needs to be done?',
    editing: false,
    newTodo: false
  }, propOverrides)

  const renderer = createRenderer()

  renderer.render(
    <TodoTextInput {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.props.placeholder).toEqual('What needs to be done?')
      expect(output.props.value).toEqual('Use Redux')
      expect(output.props.className).toEqual('')
    })

    it('should render correctly when editing=true', () => {
      const { output } = setup({ editing: true })
      expect(output.props.className).toEqual('edit')
    })

    it('should render correctly when newTodo=true', () => {
      const { output } = setup({ newTodo: true })
      expect(output.props.className).toEqual('new-todo')
    })

    it('should update value on change', () => {
      const { output, renderer } = setup()
      output.props.onChange({ target: { value: 'Use Radox' } })
      const updated = renderer.getRenderOutput()
      expect(updated.props.value).toEqual('Use Radox')
    })

    it('should call onSave on return key press', () => {
      const { output, props } = setup()
      output.props.onKeyDown({ which: 13, target: { value: 'Use Redux' } })
      expect(props.onSave).toBeCalledWith('Use Redux')
    })

    it('should reset state on return key press if newTodo', () => {
      const { output, renderer } = setup({ newTodo: true })
      output.props.onKeyDown({ which: 13, target: { value: 'Use Redux' } })
      const updated = renderer.getRenderOutput()
      expect(updated.props.value).toEqual('')
    })

    it('should call onSave on blur', () => {
      const { output, props } = setup()
      output.props.onBlur({ target: { value: 'Use Redux' } })
      expect(props.onSave).toBeCalledWith('Use Redux')
    })

    it('shouldnt call onSave on blur if newTodo', () => {
      const { output, props } = setup({ newTodo: true })
      output.props.onBlur({ target: { value: 'Use Redux' } })
      expect(props.onSave).not.toBeCalled()
    })

    // it('simulate input change event verify assign fn be called ', () => {

    //   const props = {
    //     onSave: jest.fn(),
    //     text: 'Use Redux',
    //     placeholder: 'What needs to be done?',
    //     editing: false,
    //     newTodo: false
    //   }

    //   const wrapper = shallow(<TodoTextInput {...props} />);
    //   const event = {
    //     which: 13,
    //     preventDefault() {},
    //     target: { name: 'onSave', value: 'custom value' }
    //   };
    //   wrapper.find('input').simulate('change', event);
    //   expect(props.onSave).toBeCalledWith(0);
     
    // });
  })
})
