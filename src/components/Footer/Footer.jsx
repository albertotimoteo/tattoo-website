import React from 'react'

import { Link } from 'react-router-dom'
import Instagram from '../../assets/icons/Instagram'

import * as S from './Footer.styled'

const Footer = () => (
  <S.Footer>
    <S.LogoAndInsta>
      Marilinger Tattoo ®️
      <a
        href='https://www.instagram.com/marilingerr'
        target='_blank'
        rel='noreferrer'
      >
        <Instagram />
      </a>
    </S.LogoAndInsta>
    <div>
      Navegação rápida
      <ul>
        <li>
          <Link to='/'>Reserva de Flash</Link>
        </li>
        <li>
          <Link to='/orcamento'>Orçamento</Link>
        </li>
        <li>
          <Link to='/condicoes-agendamento'>Condições de Agendamento</Link>
        </li>
        <li>
          <Link to='/sobre-mari'>Sobre a Mari</Link>
        </li>
        <li>
          <Link to='/contato'>Contato</Link>
        </li>
      </ul>
    </div>
    <div>Site por Alberto Timóteo.</div>
  </S.Footer>
)

export default Footer
