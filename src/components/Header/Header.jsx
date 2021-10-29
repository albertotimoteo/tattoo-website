import React from 'react'

import { useHistory } from 'react-router-dom'
import Menu from '../Menu/Menu'

import headerImage from '../../assets/images/headerImg.PNG'
import * as S from './Header.styled'

const Header = () => {
  const history = useHistory()
  return (
    <S.Wrapper>
      <S.ImgWrapper>
        <S.Image
          src={headerImage}
          alt='Banner da página'
          onClick={() => history.push('/')}
        />
      </S.ImgWrapper>
      <Menu />
    </S.Wrapper>
  )
}

export default Header
