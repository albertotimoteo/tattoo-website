import React from 'react'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'
import * as S from './ProductCard.styled'

const ProductCard = ({ name, picture, alternativePicture, price, code }) => {
  const history = useHistory()

  return (
    <S.Wrapper>
      <S.ProductImage
        img={picture}
        altImg={alternativePicture}
        onClick={() => history.push(`/flash-detalhes/${code}`)}
      />
      <S.LinkWrapper>
        <S.Link
          onClick={() => history.push(`/flash-detalhes/${code}`)}
        >{`${name} - R$${price}`}</S.Link>
      </S.LinkWrapper>
    </S.Wrapper>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  alternativePicture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
}

export default ProductCard
