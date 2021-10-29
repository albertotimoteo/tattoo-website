import React from 'react'

import * as S from '../WhoIs/WhoIs.styled'

const Contact = () => (
  <S.Wrapper>
    <S.TextDiv>
      <S.Title>Contato</S.Title>
      <p>
        Instagram:{' '}
        <a
          href='https://www.instagram.com/marilingerr'
          target='_blank'
          rel='noreferrer'
        >
          @marilingerr
        </a>
      </p>
      <p>
        E-mail:{' '}
        <a href='mailto:marilingercontato@gmail.com'>
          marilingercontato@gmail.com
        </a>
      </p>
      <p>
        Atendimento em estúdio privado localizado no bairro Funcionários, Bh,
        MG. O endereço do local será passado na mensagem de confirmação do
        horário que será enviada na semana da tatuagem.{' '}
      </p>
    </S.TextDiv>
  </S.Wrapper>
)

export default Contact
