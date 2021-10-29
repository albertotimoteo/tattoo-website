import styled from 'styled-components'

export const Wrapper = styled.div`
  font-family: sans-serif;
  color: #49694a;
  font-size: 16px;
  padding-left: 40px;
  width: 80%;
  margin-bottom: 20px;

  h3 {
    margin-top: 5px;
  }

  @media(max-width: 767px) {
    width: 85%;
    padding-left: 10px;
  }
`

export const Row = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .reference {
    margin-bottom: 6px;
  }
`

export const ListItem = styled.li`
  margin: 12px 0px;
`

export const FileUpload = styled.div`
  width: 50%;
  margin-top: 10px;
  display: flex;
  align-items: center;

  @media(max-width: 767px) {
    width: 100%;
  }
`
