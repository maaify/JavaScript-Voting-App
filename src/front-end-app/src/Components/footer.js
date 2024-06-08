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
    const Footer = styled.footer`
      background: ${Colors.primaryColor};
    `

    const H5 = styled.h5`
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-left: 1rem;
      display: inline-block;
    `

    const A = styled.a`
      color: ${Colors.grayColor};
      font-size: 0.8rem;
    `

    return (
      <Footer className={this.props.className}>
        <H5>
          <A href="https://github.com/maaify/javascript-framework-ratings">
            By MAAify
          </A>
        </H5>
      </Footer>
    )
  }
}
