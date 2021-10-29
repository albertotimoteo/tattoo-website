import React from 'react'

import Mari from '../../assets/images/mari.JPG'
import * as S from './WhoIs.styled'

const WhoIs = () => (
  <S.Wrapper>
    <S.Photo src={Mari} alt='Fotografia da Mari' />
    <S.TextDiv>
      <S.Title>Sobre a Mari</S.Title>
      <p>
        Ao contrário que muitos pensam Linger não é meu sobrenome, é apenas uma
        música da banda The Cramberries que eu gosto muito e decidi homenagear
        ao criar meu nome artístico Marilinger. Meu nome mesmo é Mariana
        Eufrásio, e tenho 25 anos e estudo design na Ufmg. Além disso, não
        podemos esquecer o mais importante: sou mãe dos pets Theo, Luna e
        Claudinho.{' '}
      </p>
      <p>
        Meu interesse nas artes surgiu desde criança, mas a ideia de virar
        tatuadora surgiu quando eu trabalhava na biblioteca pública, lá na praça
        da liberdade, e tive contato com um amigo que também estava começando a
        tatuar. Quando eu comecei eu nunca imaginei que seria a minha profissão,
        muito menos que chegaria onde cheguei, já com meu próprio estúdio e uma
        referência em Bh em florais em fine line.
      </p>
      <p>
        {' '}
        Eu acredito que para ser tatuador é necessário muito estudo, quem dera
        se fosse apenas um dom. Meu objetivo hoje em dia é florir cada vez mais
        pessoas, em diferentes estados e países. Que a minha arte seja cada vez
        mais inovadora e consiga marcar amor na pele das minhas clientes.
      </p>
      <p>
        Um beijo a todes que acompanham meu trabalho e que de alguma forma me
        ajudaram a chegar aqui {`<3`} Mari{' '}
      </p>
    </S.TextDiv>
  </S.Wrapper>
)

export default WhoIs
