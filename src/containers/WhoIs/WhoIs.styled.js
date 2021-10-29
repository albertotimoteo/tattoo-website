import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: sans-serif;
  font-size: 16px;
  width: 100%;
  color: #49694a;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Photo = styled.img`
  width: 30%;

  @media (max-width: 767px) {
    width: 50%;
  }
`

export const TextDiv = styled.div`
  width: 45%;

  @media (max-width: 767px) {
    width: 80%;
  }
`

export const Title = styled.h3`
  margin-top: 5px;
  margin-bottom: 12px;
  font-size: 26px;
`
export const ListItem = styled.li`
  margin: 12px 0px;
`
