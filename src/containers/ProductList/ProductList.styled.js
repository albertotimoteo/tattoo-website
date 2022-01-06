import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 80%;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  background: white;

  font-family: sans-serif;
  color: #49694a;
  font-size: 16px;
  padding-left: 40px;

  @media(max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`
