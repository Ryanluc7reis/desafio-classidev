import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { withIronSessionSsr } from 'iron-session/next'
import { ironConfig } from '../lib/middlewares/ironSession'
import Input from '../src/components/form/Input'
import NavBar from '../src/components/navbar/NavBar'
import Card from '../src/components/card/Card'
import Footer from '../src/components/footer/Footer'
import Selecter from '../src/components/form/Selecter'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to left, #4d4d4d 15%, #000 100%);
`

const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: 350px 350px 350px;
  margin: 0 130px;
  @media (max-width: 1150px) {
    display: flex;
    flex-wrap: wrap;
  }
`

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
`

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  width: 504px;
  height: 46px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.inputBackground};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 636px) {
    width: 300px;
    flex-direction: column;
    height: auto;
    gap: 15px;
  }
`

const FooterAlt = styled(Footer)`
  margin-top: 270px;
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

export default function Home() {
  const router = useRouter()
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/card`, fetcher)
  const { control } = useForm({
    mode: 'all'
  })

  const [searchCard, setSearchCard] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const lowerSearch = searchCard.toLowerCase()
  const lowerSearch2 = selectedCategory.toLowerCase()

  const filterData =
    data &&
    data.filter(
      (card) =>
        card.title.toLowerCase().includes(lowerSearch) &&
        (selectedCategory === '' || card.category.toLowerCase() === lowerSearch2)
    )

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue)
  }

  const handleSeach = (e) => {
    setSearchCard(e.target.value)
  }
  const handleId = (cardId) => {
    router.push(`reviewAnnouncement?id=${cardId}`)
  }
  if (error) return <LoadingScreen>Erro ao carregar dados.</LoadingScreen>
  if (!data) return <LoadingScreen>Carregando...</LoadingScreen>
  return (
    <Container>
      <NavBar type1 />
      <ContainerContent>
        <InputsContainer>
          <Input name="title" control={control} onChange={handleSeach} type1 />
          <Selecter name="price" control={control} onChange={handleCategoryChange} type2 />
        </InputsContainer>
        <h2 style={{ color: '#c5c5c5', marginTop: '15px', fontWeight: '500' }}>
          Clique em um anúncio para saber mais sobre
        </h2>
        <ContainerCards>
          {filterData.length === 0 ? (
            <h1 style={{ color: 'white' }}>Nenhum anúncio encontrado</h1>
          ) : (
            filterData.map((card) => (
              <Card
                onClick={() => handleId(card._id)}
                key={card._id}
                title={card.title}
                date={card.createdDate}
                price={card.price}
                description={card.description}
                category={card.category}
                id={card._id}
              />
            ))
          )}
        </ContainerCards>
      </ContainerContent>
      <FooterAlt />
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
