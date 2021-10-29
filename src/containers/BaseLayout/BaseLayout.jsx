import React from 'react'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import * as S from './BaseLayout.styled'

const BaseLayout = ({ children }) => (
  <>
    <S.Wrapper>
      <Header />
      {children}
    </S.Wrapper>
    <Footer />
  </>
)

export default BaseLayout
