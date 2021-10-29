import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { useParams } from 'react-router-dom'

import { Carousel } from 'react-responsive-carousel'

import FlashForm from '../FlashForm/FlashForm'
import { catalogData } from '../../utils/catalogData'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import * as S from './ProductDetails.styled'

const ProductDetails = () => {
  const [showForm, setShowForm] = useState(false)
  const { code } = useParams()
  const { picture, alternativePicture, name, price, size } = catalogData.filter(
    product => product.code === code
  )[0]

  window.scrollTo(0, 350)

  return (
    <S.Wrapper>
      <S.CarouselContainer showForm={showForm}>
        <Carousel swipeable dynamicHeight={false}>
          <div>
            <img src={picture} alt={name} />
          </div>
          <div>
            <img src={alternativePicture} alt={name} />
          </div>
        </Carousel>
      </S.CarouselContainer>
      <S.InfoWrapper>
        {showForm ? (
          <FlashForm />
        ) : (
          <>
            <S.Title>{name}</S.Title>
            <S.SubTitle>
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </S.SubTitle>
            <S.Details>
              Antes de clicar no botão abaixo, leia as informações a seguir:
            </S.Details>
            <ul>
              <S.ListItem>
                Esse flash poderá ser feito em até {size}cm e terá o valor de R$
                {price} à vista, para o parcelamento serão cobrados os juros da
                maquininha.
              </S.ListItem>
              <S.ListItem>
                Para a reserva do flash será cobrado um sinal de R$100 e esse
                valor será descontado no valor total da tatuagem. O sinal será
                feito exclusivamente via pix e o prazo para a confirmação será
                de 1h.
              </S.ListItem>
              <S.ListItem>
                Caso queira alterar o tamanho será cobrado a mais por essa
                alteração (favor consultar os valores via e-mail).
              </S.ListItem>
              <S.ListItem>
                Flashs são desenhos prontos que NÃO terão alterações no desenho,
                apenas poderá ser acrescentado cor com acréscimo de 30% no valor
                total do desenho.
              </S.ListItem>
              <S.ListItem>
                Cada flash é autoral e exclusivo, ou seja, só será tatuado em
                uma pessoa. Caso o flash que você gostou seja vendido você pode
                solicitar que a Mari crie um pra você utilizando ele como
                referência.
              </S.ListItem>
              <S.ListItem>
                As imagens de local do corpo são apenas sugestões da Mari e não
                necessariamente apresentam o tamanho real que a tattoo vai ficar
                em você.
              </S.ListItem>
            </ul>
            <S.DetailsButton onClick={() => setShowForm(true)}>
              Quero reservar este flash
            </S.DetailsButton>
          </>
        )}
      </S.InfoWrapper>
    </S.Wrapper>
  )
}

export default withRouter(ProductDetails)
