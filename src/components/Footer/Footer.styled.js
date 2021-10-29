import styled from 'styled-components'

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  width: auto;
  margin-top: 20px;
  border-top: 1px #49694a solid;
  color: #49694a;
  font-family: sans-serif;
  font-size: 16px;

  @media(max-width: 767px) {
    flex-direction: column;
    
  }
`

export const LogoAndInsta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`