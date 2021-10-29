import styled from 'styled-components'

import Button from '../../components/Button/Button.styled'

export const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const MenuButton = styled(Button)`
  @media (max-width: 767px) {
    width: 45%;
    margin-bottom: 5px;
  }
`