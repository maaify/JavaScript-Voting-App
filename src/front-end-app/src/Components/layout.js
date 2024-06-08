import React, { Component } from 'react'
import Header from './header'
import Main from './main'
import styled from 'styled-components'

import Footer from './footer'
export default class Layout extends Component {
  render () {
    const FlexWrapperSection = styled.section`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `

    const FlexMain = styled(Main)`
      flex: 1;
    `

    return (
      <FlexWrapperSection>
        <Header />
        <FlexMain />
        <Footer />
      </FlexWrapperSection>
    )
  }
}
