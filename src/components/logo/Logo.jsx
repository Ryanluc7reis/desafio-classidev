import styled from 'styled-components'
import { useRouter } from 'next/router'

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`
const StyledLogo = styled.h1`
  color: #fff;
  font-size: 30px;
  font-weight: 700;
`
const StyledSubText = styled.h3`
  font-style: oblique;
  color: gray;
  font-weight: 100;
`
export default function Logo({ ...props }) {
  const router = useRouter()
  return (
    <LogoContainer {...props} onClick={() => router.push('/')}>
      <StyledLogo>ClassifiDev</StyledLogo>
      <StyledSubText>O seu classificado online</StyledSubText>
    </LogoContainer>
  )
}
