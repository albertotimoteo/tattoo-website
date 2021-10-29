import styled from 'styled-components'

import Button from '../../components/Button/Button.styled'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

export const InfoWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 20px;

  font-family: sans-serif;
  color: #49694a;

  @media (max-width: 767px) {
    width: 80%;
  }
`

export const CarouselContainer = styled.aside`
  width: 35%;
  padding-left: 20px;

  @media (max-width: 767px) {
    width: 75%;
    display: ${props => (props.showForm ? 'none' : 'initial')};
  }
`

export const Title = styled.h3`
  margin-top: 5px;
  margin-bottom: 12px;
  font-size: 26px;
`

export const SubTitle = styled.h5`
  margin: 0;
  font-size: 21px;
`

export const Details = styled.p`
  margin: 12px 0px;
`
export const ListItem = styled.li`
  margin: 12px 0px;
`

export const DetailsButton = styled(Button)`
  @media (max-width: 767px) {
    width: 100%;
  }
`
