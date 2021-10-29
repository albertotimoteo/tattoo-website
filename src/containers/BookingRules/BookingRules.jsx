import React from 'react'

import * as S from '../WhoIs/WhoIs.styled'

const BookingRules = () => (
  <S.Wrapper>
    <S.TextDiv>
      <S.Title>Condições de Agendamento</S.Title>
      <ul>
        <S.ListItem>
          <strong>O desenho</strong> por encomenda{' '}
          <strong>será entregue apenas no dia da sua sessão</strong>. Se quando
          a Mari te mostrar o desenho ainda não estiver do jeito que você
          imaginou vocês fazem as alterações juntas lá na hora.
        </S.ListItem>
        <S.ListItem>
          Para a reserva de um desenho autoral é cobrado um sinal de 100 reais e
          esse valor não é devolvido em caso de desistência (só agende uma
          tattoo com a Mari se você tiver certeza para não gerar nenhum
          desconforto).O valor do sinal é descontado no orçamento total da sua
          tatuagem.
        </S.ListItem>
        <S.ListItem>
          Entendemos que imprevistos acontecem, mas a Mari é uma profissional
          autônoma e os boletos não param de vir, e quando você remarca em cima
          da hora podemos não conseguir ocupar esse horário e a Mari, muitas
          vezes, perde esse horário. Por essa razão, a remarcação sem custo será
          feita apenas com 7 dias ou mais de antecedência do seu horário. Se
          você precisar remarcar o horário com menos de uma semana de
          antecedência será cobrado um novo sinal 100 reais, ou seja, sua
          tatuagem sairá 100 reais mais cara.
        </S.ListItem>
        <S.ListItem>
          O pagamento da sua tatuagem pode ser feito em dinheiro, Pix,
          transferência, débito ou crédito. Para parcelamento são cobrados os
          juros da maquininha.
        </S.ListItem>
        <S.ListItem>Não será aceito o pagamento via cheque</S.ListItem>
        <S.ListItem>
          Esse orçamento é válido apenas para os meses de novembro, dezembro e
          janeiro. Caso você não consiga fazer a tattoo nesse prazo será
          necessário fazer outro orçamento.
        </S.ListItem>
        <S.ListItem>
          Temos que lembrar que tatuagem é um processo manual e às vezes podem
          haver falhinhas na sua tattoo. Caso seja necessário o retoque da sua
          tatuagem será cobrado um valor de 100 reais para cobrir as despesas
          com o material, e esse valor deve ser acertado no agendamento do
          retoque.
        </S.ListItem>
      </ul>
    </S.TextDiv>
  </S.Wrapper>
)

export default BookingRules
