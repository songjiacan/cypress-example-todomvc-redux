import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Header from '../../src/components/Header'
import TodoTextInput from '../../src/components/TodoTextInput'
import { addTodo } from '../../src/actions'

configure({adapter: new Adapter()});

const setup = () => {
  const props = {
    addTodo: jest.fn()
  }
  
  const renderer = createRenderer();
  renderer.render(<Header {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Header', () => {

    it('matches snapshot', () => {
      const {output, props } = setup()
      const tree = renderer
        .create(<Header {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();

    });

    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('header')
      expect(output.props.className).toBe('header')

      const [ h1, input ] = output.props.children
      expect(h1.type).toBe('h1')
      expect(h1.props.children).toBe('todos')
      expect(input.type).toBe(TodoTextInput)
      expect(input.props.newTodo).toBe(true)
      expect(input.props.placeholder).toBe('What needs to be done?')
    })

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup()
      const input = output.props.children[1]
      input.props.onSave('')
      expect(props.addTodo).not.toBeCalled()
      input.props.onSave('Use Redux')
      expect(props.addTodo).toBeCalled()
    })

    test('match snapshot with enzyme', () => {
      const {output, props } = setup()
      
      let component = shallow(<Header {...props}  />);
    
      // expect(header.text()).toEqual('Off');
      // cy.get('header input').type('Use Redux{enter}')
      // cy.get('@addTodo').should('have.been.called')
      expect(component).toMatchSnapshot();
      // expect(component.find('input').placeholder()).toEqual('');
      // component
      //     .find('input').get(0)
      //     .simulate('keydown', { which: 'abc' });
      //     // .simulate('click');    
      // expect(props.addTodo).toHaveBeenCalled();
      
    });

  })
})
