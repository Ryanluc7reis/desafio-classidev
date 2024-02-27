import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
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
  background: ${(props) => props.theme.colors.background};
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

const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export default function Home() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/card`, fetcher)
  const { control } = useForm({
    mode: 'all'
  })

  const [searchCard, setSearchCard] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const router = useRouter()

  if (error) return <div>Erro ao carregar os dados</div>
  if (!data) return <div>Carregando...</div>

  const lowerSearch = searchCard.toLowerCase()
  const lowerSearch2 = selectedCategory.toLowerCase()
  const filterData = data.filter(
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

  return (
    <Container>
      <NavBar type1 />
      <ContainerContent>
        <InputsContainer>
          <Input name="title" control={control} onChange={handleSeach} type1 />
          <Selecter name="price" control={control} onChange={handleCategoryChange} type2 />
        </InputsContainer>
        <Link
          style={{ color: 'white', fontSize: '17px', margin: '25px ' }}
          href="/reviewAnnouncement"
        >
          {filterData.length === 0 ? '' : 'Veja mais sobre os anúncios'}
        </Link>
        <ContainerCards>
          {filterData.length === 0 ? (
            <h1 style={{ color: 'white' }}>Nenhum anúncio encontrado</h1>
          ) : (
            filterData.map((card) => (
              <Card
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
