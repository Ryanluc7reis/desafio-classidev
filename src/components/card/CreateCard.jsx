import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'

import { createCardSchema } from '../../../modules/card/card.schema'

import Input from '../form/Input'
import Button from '../form/Button'
import Selecter from '../form/Selecter'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 70px;
  background: ${(props) => props.theme.colors.background};
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 58px;
  color: ${(props) => props.theme.colors.white};
`

const FormContainer = styled.div`
  margin-top: 50px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 20px;
`

const InputAlt = styled(Input)`
  height: 126px;
  padding-bottom: 80px;
`

const ButtonAlt = styled(Button)`
  width: 504px;
`

export default function CreateCard() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    setError
  } = useForm({
    resolver: joiResolver(createCardSchema),
    mode: 'all'
  })
  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue)
  }
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const onSubmit = async (data) => {
    setLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/card`, data)
    try {
      if (response.status === 201) {
        reset()
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/card`)
        setLoading(false)
        router.push('/')
      }
    } catch ({ response }) {
      if (response.data) {
        setError('price', {
          message: 'Essa área nao aceita pontuação'
        })
      }
    }
  }

  return (
    <Container>
      <Title>Crie seu anúncio </Title>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Nome do produto" name="title" control={control} type2 />
          <Selecter name="category" control={control} onChange={handleCategoryChange} type1 />
          <Input placeholder="Preço" name="price" control={control} type2 />
          <Input placeholder="Whatsapp" name="whatsapp" control={control} type2 />
          <InputAlt placeholder="Descrição" name="description" control={control} type2 />
          <ButtonAlt loading={loading} disabled={!isValid}>
            Criar anúncio
          </ButtonAlt>
        </Form>
      </FormContainer>
    </Container>
  )
}
