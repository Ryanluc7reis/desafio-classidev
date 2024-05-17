import styled from 'styled-components'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'

import { ironConfig } from '../lib/middlewares/ironSession'

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
const LoadingScreen = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  color: white;
  background: linear-gradient(to left, #4d4d4d 15%, #000 100%);
`
const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export default function ReviewAnnouncementPage({ user }) {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/card/getOneCard?id=${id}` : null,
    fetcher
  )
  if (error) return <LoadingScreen>Erro ao carregar dados.</LoadingScreen>
  if (!data) return <LoadingScreen>Carregando...</LoadingScreen>
  return (
    <Container>
      <NavBar type2 />
      <BacktoHomeContainer>
        <ArrowImg src="/arrow-left.png" />
        <TextLink onClick={() => router.push('/')}>Voltar para a página inicial</TextLink>
      </BacktoHomeContainer>

      {data && (
        <Review
          id={data._id}
          title={data.title}
          date={data.createdDate}
          price={data.price}
          description={data.description}
          category={data.category}
          whatsapp={data.whatsapp}
          isOwner={data.creator === user.id}
        />
      )}

      <Footer />
    </Container>
  )
}
export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  return {
    props: {
      user
    }
  }
}, ironConfig)
