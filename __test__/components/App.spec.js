import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import App from '../../src/components/App'
import Header from '../../src/containers/Header'
import MainSection from '../../src/containers/MainSection'


const setup = propOverrides => {
  const renderer = createRenderer()
  renderer.render(<App />)
  const output = renderer.getRenderOutput()
  return output
}

describe('components', () => {
  describe('Header', () => {
    it('should render', () => {
      const output = setup()
      const [ header ] = output.props.children
      expect(header.type).toBe(Header)
    })
  })
  
  describe('Mainsection', () => {
    it('should render', () => {
      const output = setup()
      const [ , mainSection ] = output.props.children
      expect(mainSection.type).toBe(MainSection)
    })
  })
})