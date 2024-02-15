import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'
import { useRouter } from 'next/router'

import { signupSchema } from '../modules/user/user.schema'

import Logo from '../src/components/logo/Logo'
import Button from '../src/components/form/Button'
import Input from '../src/components/form/Input'

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  @media (max-width: 436px) {
    padding-bottom: 50px;
    gap: 0px;
  }
`
const FormContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #3f3f3fe5;
  @media (max-width: 436px) {
    padding: 25px;
    width: 350px;
    margin-top: 35px;
  }
  @media (max-width: 360px) {
    padding: 15px 17px;
    width: 310px;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 4px;
`

const Text = styled.h1`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`
const TextAlt = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 15px;
  text-align: center;
`
const ButtonAlt = styled(Button)`
  margin-left: 18px;
  width: 90%;
`

function SignupPage() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: joiResolver(signupSchema)
  })

  const [loading, setLoading] = useState(false)
  const handleForm = async (data) => {
    try {
      setLoading(true)
      const { status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
        data
      )
      if (status === 201) {
        router.push('/')
      }
    } catch (err) {
      if (err.response.data.code === 11000) {
        setError('user', {
          message: 'Ja existe uma conta com esse valor'
        })
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container>
      <Logo />
      <FormContainer>
        <Text>Crie sua conta</Text>
        <Form onSubmit={handleSubmit(handleForm)}>
          <Input label="Nome" name="firstName" control={control} type3 />
          <Input label="Sobrenome" name="lastName" control={control} type3 />
          <Input label="Usuário" name="user" control={control} type3 />
          <Input label="Email " type="email" name="email" control={control} type3 />
          <Input label="Senha" type="password" name="password" control={control} type3 />
          <ButtonAlt loading={loading} type="submit" disabled={Object.keys(errors).length > 0}>
            Cadastrar
          </ButtonAlt>
        </Form>
        <TextAlt>
          Ja possui uma conta ?{' '}
          <Link style={{ color: 'blue' }} href="/login">
            Faça seu login
          </Link>
        </TextAlt>
      </FormContainer>
    </Container>
  )
}
export default SignupPage
