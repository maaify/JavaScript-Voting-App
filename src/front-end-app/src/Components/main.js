import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Voting from './voting'

export default class Main extends Component {
  protocol = window.location.protocol
  host = window.location.host

  constructor () {
    super()
    this.state = { frameworks: [] }
  }

  get url () {
    return `${this.protocol}//${this.host}/api/`
  }

  get votingUrl () {
    return `${this.url}voting`
  }

  static get propTypes () {
    return {
      className: PropTypes.string,
    }
  }

  async componentDidMount () {
    const response = await fetch(this.votingUrl)
    const frameworks = await response.json()
    await this.setState({ frameworks })
  }

  render () {
    const FlexMain = styled.main`
      display: flex;
      justify-content: center;
      margin: 2rem;
    `

    return (
      <FlexMain className={this.props.className}>
        <Voting
          frameworks={this.state.frameworks}
          onVote={async (id, rating) => {
            const response = await fetch(this.votingUrl, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id, rating }),
            })

            const framework = await response.json()
            const { frameworks } = this.state
            frameworks.find(fw => fw.id === id).avgRating = framework.avgRating
            this.setState({ frameworks })
          }}
        />
      </FlexMain>
    )
  }
}
