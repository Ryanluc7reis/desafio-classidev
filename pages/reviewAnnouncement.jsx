import styled from 'styled-components'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import NavBar from '../src/components/navbar/NavBar'
import Footer from '../src/components/footer/Footer'
import Review from '../src/components/review/Review'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
`
const BacktoHomeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  margin: 50px 0 20px 150px;
  @media (max-width: 473px) {
    margin: 50px 0 20px 70px;
  }
`
const TextLink = styled.h3`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: 400;
`
const ArrowImg = styled.img`
  width: 16px;
  height: 16px;
`

export default function reviewAnnouncementPage({ user }) {
  const router = useRouter()
  const fetcher = async (url) => {
    const response = await axios.get(url)
    return response.data
  }
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/card`, fetcher)

  return (
    <Container>
      <NavBar type2 />
      <BacktoHomeContainer>
        <ArrowImg src="/arrow-left.png" />
        <TextLink onClick={() => router.push('/')}>Voltar para a página inicial</TextLink>
      </BacktoHomeContainer>
      {data?.map((card) => (
        <Review
          id={card._id}
          key={card._id}
          title={card.title}
          date={card.createdDate}
          price={card.price}
          description={card.description}
          category={card.category}
          whatsapp={card.whatsapp}
        />
      ))}
      <Footer />
    </Container>
  )
}
