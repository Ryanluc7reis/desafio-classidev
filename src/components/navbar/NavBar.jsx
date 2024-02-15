import styled from 'styled-components'
import axios from 'axios'
import { useRouter } from 'next/router'

import Logo from '../logo/Logo'
import Button from '../form/Button'

const ContainerBox = styled.div``

const NavbarContainer = styled.div`
  height: 116px;
  width: 100%;
  background: rgba(31, 31, 31, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 55px;
  @media (max-width: 636px) {
    flex-direction: column;
    height: auto;
    gap: 15px;
  }
`
const StyledLogout = styled.a`
  cursor: pointer;
  font-size: 17px;
  color: ${(props) => props.theme.colors.white};
  :hover {
    color: darkred;
  }
`
export default function NavBar({ type1, type2 }) {
  const router = useRouter()
  const handlelogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`)
    router.push('/login')
  }
  return (
    <ContainerBox>
      {type1 && (
        <NavbarContainer>
          <Logo />
          <Button onClick={() => router.push('/createAnnouncement')}>Criar anúncio</Button>
          <StyledLogout onClick={handlelogout}>Desconectar</StyledLogout>
        </NavbarContainer>
      )}
      {type2 && (
        <NavbarContainer>
          <Logo />
        </NavbarContainer>
      )}
    </ContainerBox>
  )
}
