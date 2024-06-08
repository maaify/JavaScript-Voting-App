import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Colors from './colors'

export default class Main extends Component {
  static get propTypes () {
    return {
      className: PropTypes.string,
    }
  }

  render () {
    const Header = styled.header`
      background-color: ${Colors.primaryColor};
      display: flex;
      justify-content: center;
    `
    const H1 = styled.h1`
      display: inline-block;
      color: ${Colors.secondPrimaryColor};
      font-size: 3rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    `

    return (
      <Header className={this.props.className}>
        <H1>JavaScript Framework Voting</H1>
      </Header>
    )
  }
}
