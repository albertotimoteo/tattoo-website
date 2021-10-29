import styled from 'styled-components'

export default styled.button`
  background: #dbf5d3;
  opacity: 0.8;
  border: 1px gray solid;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  margin-right: 4px;
  min-width: 80px;
  box-shadow: 0px 2px 2px rgba(50, 50, 71, 0.06),
    0px 2px 4px rgba(50, 50, 71, 0.06);
  color: #49694a;
  font-family: sans-serif;
  font-size: 14px;

  &:active {
    background-color: #bdd4b2;
    box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
      0px 4px 8px rgba(50, 50, 71, 0.06);
    transform: translateY(1px);
  }
  &:disabled {
    background-color: gray;
  }
`
