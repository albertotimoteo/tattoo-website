import styled from "styled-components";

export const ProductImage = styled.div`
  width: 100%;
  height: 350px;
  background: url(${props => props.img} );
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  cursor: pointer;

  &:hover{
    background: url(${props => props.altImg} );
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
  }
`

export const Link = styled.a`
  font-size: 14px;
  font-weight: 400;
  font-family: sans-serif;
  color: #49694A;
  text-align: center;
  width: 100%;
  text-decoration: none;
  cursor: pointer;
`

export const LinkWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  text-align: center;
`

export const Wrapper = styled.div`
  width: 28%;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: 3%;
  border: 0.7px #9aa0a1 solid;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(max-width: 767px) {
    width: 250px;
  }
`