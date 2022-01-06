import React from 'react'

import { useFlash } from '../../store/flash'
import { useOptions } from '../../store/options'

import ProductCard from '../../components/ProductCard/ProductCard'
import { withRouter } from 'react-router-dom'

import * as S from './ProductList.styled'

const ProductList = () => {
  const { $flash } = useFlash()
  const { $options } = useOptions()
  const { isBooking } = $options

  if (!isBooking) {
    return (
      <S.Wrapper>
        <div>A agenda no momento está fechada.</div>
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper>
      {$flash.length ? (
        $flash.map(product => <ProductCard key={product.code} {...product} />)
      ) : (
        <div>Carregando...</div>
      )}
    </S.Wrapper>
  )
}

export default withRouter(ProductList)
