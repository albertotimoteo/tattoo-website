import React from 'react'

import ProductCard from '../../components/ProductCard/ProductCard'
import { withRouter } from 'react-router-dom'
import { catalogData } from '../../utils/catalogData'

import * as S from './ProductList.styled'

const sortArray = (firstElement, secondElement) => {
  return firstElement.price - secondElement.price
}

const sorttedArray = catalogData.sort(sortArray)

const ProductList = () => (
  <S.Wrapper>
    {sorttedArray.map(product => (
      <ProductCard key={product.code} {...product} />
    ))}
  </S.Wrapper>
)

export default withRouter(ProductList)
