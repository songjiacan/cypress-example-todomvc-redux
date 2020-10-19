import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow, configure } from 'enzyme';
import TodoItem from '../../src/components/TodoItem'
import TodoTextInput from '../../src/components/TodoTextInput'
configure({adapter: new Adapter()});

const setup = ( editing = false ) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn()
  }

  const renderer = createRenderer()

  renderer.render(
    <TodoItem {...props} />
  )

  let output = renderer.getRenderOutput()

  if (editing) {
    const label = output.props.children.props.children[1]
    label.props.onDoubleClick({})
    output = renderer.getRenderOutput()
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

const setup1 = ( editing = false ) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn()
  }

  const wrapper = shallow(<TodoItem {...props} />);

  return {
    props : props,
    wrapper : wrapper
  };

}

describe('components', () => {
  describe('TodoItem', () => {

    it('Todo item render correctly', () => {
      const { wrapper, props } = setup1();

      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('button').length).toBe(1);
    });

    it('simulate input change event verify assign fn be called ', () => {
      const { wrapper, props } = setup1();
      const event = {
        which: 13,
        preventDefault() {},
        target: { name: 'onChange', value: 'custom value' }
      };
      wrapper.find('input').simulate('change', event);
      expect(props.completeTodo).toBeCalledWith(0);
    });

    it('deep reder with mount to simulate input change event verify assign fn be called ', () => {
      const { wrapper, props } = setup1();
      const component = mount(<TodoItem {...props} value="custom value" /> );
      const event = {
        which: 13,
        preventDefault() {},
        target: {name: 'onChange', value: 'custom value' }
      };
      component.find('input').simulate('change');
      expect(props.completeTodo).toBeCalledWith(0);
    });


    it('reder item title', () => {
      const { wrapper, props } = setup1();
      expect(wrapper.find('label').text()).toBe(props.todo.text);
    });

    it('matches snapshot by enzyme', () => {
      const { wrapper } = setup1();
      expect(wrapper).toMatchSnapshot();

    });
    it('matches snapshot', () => {
      const {output , props } = setup()
      let component = renderer
        .create(<TodoItem {...props} />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      // // manually trigger the callback
      // tree.props.editTodo();
      // // re-rendering
      // tree = component.toJSON();
      // expect(tree).toMatchSnapshot();

      //  // manually trigger the callback
      //  tree.props.completeTodo();
      //  // re-rendering
      //  tree = component.toJSON();
      //  expect(tree).toMatchSnapshot();
    });

    it('initial render', () => {
      const { output } = setup()

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('todo')

      const div = output.props.children

      expect(div.type).toBe('div')
      expect(div.props.className).toBe('view')

      const [ input, label, button ] = div.props.children

      expect(input.type).toBe('input')
      expect(input.props.checked).toBe(false)

      expect(label.type).toBe('label')
      expect(label.props.children).toBe('Use Redux')

      expect(button.type).toBe('button')
      expect(button.props.className).toBe('destroy')
    })

    it('input onChange should call completeTodo', () => {
      const { output, props } = setup()
      const input = output.props.children.props.children[0]
      input.props.onChange({})
      expect(props.completeTodo).toBeCalledWith(0)
    })

    it('button onClick should call deleteTodo', () => {
      const { output, props } = setup()
      const button = output.props.children.props.children[2]
      button.props.onClick({})
      expect(props.deleteTodo).toBeCalledWith(0)
    })

    it('label onDoubleClick should put component in edit state', () => {
      const { output, renderer } = setup()
      const label = output.props.children.props.children[1]
      label.props.onDoubleClick({})
      const updated = renderer.getRenderOutput()
      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('todo editing')
    })

    it('edit state render', () => {
      const { output } = setup(true)

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('todo editing')

      const input = output.props.children
      expect(input.type).toBe(TodoTextInput)
      expect(input.props.text).toBe('Use Redux')
      expect(input.props.editing).toBe(true)
    })

    it('TodoTextInput onSave should call editTodo', () => {
      const { output, props } = setup(true)
      output.props.children.props.onSave('Use Redux')
      expect(props.editTodo).toBeCalledWith(0, 'Use Redux')
    })

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      const { output, props } = setup(true)
      output.props.children.props.onSave('')
      expect(props.deleteTodo).toBeCalledWith(0)
    })

    it('TodoTextInput onSave should exit component from edit state', () => {
      const { output, renderer } = setup(true)
      output.props.children.props.onSave('Use Redux')
      const updated = renderer.getRenderOutput()
      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('todo')
    })
  })
})
