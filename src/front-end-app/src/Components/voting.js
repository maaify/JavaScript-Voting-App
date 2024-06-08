import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Colors from './colors'
import Rating from './rating'

export default class Voting extends Component {
  constructor (props) {
    super(props)

    this.state = {
      frameworks: props.frameworks,
    }
  }

  render () {
    const Table = styled.table`
      width: 100%;
      border-spacing: 0 0;
      border-collapse: collapse;
    `

    const Tr = styled.tr`
      color: ${Colors.blackColor}
      height: 4rem;
      background-color: ${props =>
    props.even ? Colors.secondPrimaryColor70PercentLighter : Colors.secondPrimaryColor90PercentLighter};
    `

    const Thead = styled.thead`
      background-color: ${Colors.secondPrimaryColor};
      color: ${Colors.whiteColor};
    `

    const Th = styled.th`
      width: 33%;
      padding: 0.5rem 0 0.5rem 0.5rem;
      border: 2px solid ${Colors.primaryColor};
      text-align: left;
      font-size: 1.4rem;
    `

    const Td = styled.td`
      width: 33%;
      padding: 1rem 0 0.2rem 1rem;
      font-size: 1.2rem;
    `

    const { frameworks, onVote } = this.props
    let isOdd = true

    return (
      <Table>
        <Thead>
          <tr>
            <Th>JavaScript Library</Th>
            <Th>Rate</Th>
            <Th>Average Rating</Th>
          </tr>
        </Thead>
        <tbody>
          {frameworks.map(fw => {
            isOdd = !isOdd
            return (
              <Tr even={!isOdd} key={fw.id}>
                <Td>{fw.name}</Td>
                <Td>
                  <Rating
                    numberRating={0}
                    totalRating={5}
                    isStatic={false}
                    onVote={starRating => onVote && onVote(fw.id, starRating)}
                  />
                </Td>
                <Td>
                  <Rating
                    numberRating={this.state.frameworks.find(framework => framework.id === fw.id).avgRating || 0}
                    totalRating={5}
                    isStatic={true}
                  />
                </Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

Voting.propTypes = {
  frameworks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avgRating: PropTypes.number.isRequired,
    }).isRequired
  ),
  onVote: PropTypes.func,
}
