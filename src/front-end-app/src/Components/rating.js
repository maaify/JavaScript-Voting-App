import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Colors from './colors'
import Typography from './typography'

export default class Rating extends Component {
  buildRating (avgRating, totalRating, isStatic, onVote) {
    const blackStarCss = `
      span&:hover {
        font-size: calc(${Typography.cellItemTextSize} + 0.5rem);
        transition: font-size 0.3s linear;
        cursor: pointer;
      }

      span&:hover,
      span&:hover ~ span {
        color: ${Colors.goldColor};
      }
      span > span& {
        display: inline;
        unicode-bidi: bidi-override;
        direction: rtl;
      }
    `

    const PartialStar = styled.i`
      letter-spacing: 0.5rem;
      font-style: normal;
      display: inline;
      font-size: ${Typography.cellItemTextSize};

      background: linear-gradient(
        to right,
        ${Colors.goldColor} 0%,
        ${Colors.goldColor} ${props => props.partialStarPercent}%,
        ${Colors.blackColor} ${props => props.partialStarPercent}%,
        ${Colors.blackColor} 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `

    const Star = styled.span`
      letter-spacing: 0.5rem;
      display: inline-block;
      font-size: ${Typography.cellItemTextSize};
      transition: font-size 0.3s linear;
      color: ${props => (props.hasColorStar ? Colors.goldColor : Colors.blackColor)};
      ${({ hasColorStar, isStatic }) => !hasColorStar && !isStatic && blackStarCss};
    `
    if (!isStatic && avgRating % 1 !== 0) {
      avgRating = Math.floor(avgRating)
    }

    const allStars = []
    const blackStars = []
    const hasPartialRating = avgRating % 1 !== 0
    const partialStarPercent = parseInt((avgRating % 1) * 10 * 10, 10)
    for (let i = 0; i < totalRating; i++) {
      if (i < avgRating) {
        if (!hasPartialRating || i < Math.floor(avgRating)) {
          allStars.push(
            <Star hasColorStar key={i}>
              ★
            </Star>
          )
        } else {
          allStars.push(
            <PartialStar hasColorStar key={i} partialStarPercent={partialStarPercent}>
              ★
            </PartialStar>
          )
        }
      } else {
        blackStars.push(
          <Star isStatic={isStatic} key={i} onClick={() => !isStatic && onVote && onVote(5 - i)}>
            ★
          </Star>
        )
      }
    }

    const BlackStarContainer = styled.span``

    if (blackStars.length > 0) {
      allStars.push(<BlackStarContainer key={allStars.length + blackStars.length + 1}>{blackStars}</BlackStarContainer>)
    }
    return allStars
  }

  render () {
    const { numberRating, totalRating, isStatic, onVote } = this.props
    return <div>{this.buildRating(parseFloat(numberRating), totalRating, isStatic, onVote)}</div>
  }
}

Rating.propTypes = {
  numberRating: PropTypes.number.isRequired,
  totalRating: PropTypes.number.isRequired,
  isStatic: PropTypes.bool.isRequired,
  onVote: PropTypes.func,
}
