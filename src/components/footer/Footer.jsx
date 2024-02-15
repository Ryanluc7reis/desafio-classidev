import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 85px;
  background: rgba(31, 31, 31, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: static;
  bottom: 0;
`
const Text = styled.h3`
  font-size: 18px;
  font-style: italic;
  font-weight: 200;
  line-height: 24px;
  color: ${(props) => props.theme.colors.white};
`
export default function Footer({ ...props }) {
  return (
    <Container {...props}>
      <Text>Criado por Ryan Lucas - Desafio SejaDev</Text>
    </Container>
  )
}
