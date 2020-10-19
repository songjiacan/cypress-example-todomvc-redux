import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Link from '../../src/components/Link'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

// import Link from '../Link.react';
// import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

const setup = (propOverrides) => {
  const props = Object.assign({
    active: false,
    children: 'All',
    setFilter: jest.fn()
  }, propOverrides)

  const rendererShadow = createRenderer();
  rendererShadow.render(<Link {...props} />)
  const output = rendererShadow.getRenderOutput()

  return {
    props: props,
    output: output,
  }
}

// const props1 = Object.assign({
//   active: false,
//   children: 'All',
//   setFilter: jest.fn()
// })

describe('component', () => {
  describe('Link', () => {

    it('matches snapshot', () => {
      const {output , props } = setup()
      const tree = renderer
        .create(<Link {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('match snapshot with enzyme', () => {
      const {output, props } = setup()
      
      let component = shallow(<Link {...props}  />);
    
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



    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('a')
      expect(output.props.style.cursor).toBe('pointer')
      expect(output.props.children).toBe('All')
    })

    it('should have class selected if active', () => {
      const { output } = setup({ active: true })
      expect(output.props.className).toBe('selected')
    })

    it('should call setFilter on click', () => {
      const { output, props } = setup()
      output.props.onClick()
      expect(props.setFilter).toBeCalled()
    })
  })
})
