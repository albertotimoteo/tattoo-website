import React from 'react'
import { useHistory } from 'react-router-dom'

import * as S from './Menu.styled'

const Menu = () => {
  const history = useHistory()
  return (
    <S.Wrapper>
      <S.MenuButton onClick={() => history.push('/')}>Reserva de Flash</S.MenuButton>
      <S.MenuButton onClick={() => history.push('/orcamento')}>Orçamentos</S.MenuButton>
      <S.MenuButton onClick={() => history.push('/condicoes-agendamento')}>Condições de Agendamento</S.MenuButton>
      <S.MenuButton onClick={() => history.push('/sobre-mari')}>Sobre a Mari</S.MenuButton>
      <S.MenuButton onClick={() => history.push('/contato')}>Contato</S.MenuButton>
    </S.Wrapper>
  )
}

export default Menu
