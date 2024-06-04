import styled from 'styled-components'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'
import { useRouter } from 'next/router'

import { loginSchema } from '../modules/user/user.schema'

import Logo from '@/components/logo/Logo'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 436px) {
    gap: 15px;
  }
`
const FormContainer = styled.div`
  margin-top: 20px;
  padding: 50px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background-color: #3f3f3fe5;
  @media (max-width: 436px) {
    padding: 25px;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 7px;
  @media (max-width: 436px) {
    margin: 10px 0px;
  }
`
const Text = styled.h1`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`
const TextAlt = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 17px;
  text-align: center;
  @media (max-width: 436px) {
    font-size: 13px;
  }
`
const ButtonAlt = styled(Button)`
  margin: 0px 19px;
  width: 90%;
`
const ButtonAlt1 = styled(Button)`
  margin: 9px 19px;
  width: 90%;
`
const LogoAlt = styled(Logo)`
  cursor: default;
`
const Barra = styled.div`
  width: 90%;
  height: 4px;
  background: grey;
  border-radius: 10px;
`
export default function LoginPage() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: joiResolver(loginSchema)
  })
  const [loading, setLoading] = useState(false)
  const onSubmitVisit = async () => {
    try {
      setLoading(true)
      const { status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
        userOrEmail: 'visit1',
        password: 'visit123'
      })
      if (status === 200) {
        router.push('/')
      }
    } catch ({ response }) {
      if (response.data === 'password incorrect') {
        setError('password', {
          message: 'A senha está incorreta.'
        })
      } else if (response.data === 'not found') {
        setError('userOrEmail', {
          message: 'Usuário ou e-mail não encontrado.'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, data)
      if (status === 200) {
        router.push('/')
      }
    } catch ({ response }) {
      if (response.data === 'password incorrect') {
        setError('password', {
          message: 'A senha está incorreta.'
        })
      } else if (response.data === 'not found') {
        setError('userOrEmail', {
          message: 'Usuário ou e-mail não encontrado.'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <LogoAlt />
      <FormContainer>
        <Text>Entre em sua conta</Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email ou usuário" name="userOrEmail" control={control} type3 />
          <Input label="Senha" type="password" name="password" control={control} type3 />
          <ButtonAlt loading={loading} type="submit" disabled={Object.keys(errors).length > 0}>
            Entrar
          </ButtonAlt>
        </Form>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Barra />
          <Text>Ou</Text>
          <Barra />
        </div>
        <ButtonAlt1 loading={loading} onClick={onSubmitVisit}>
          {' '}
          Logar como visitante
        </ButtonAlt1>
        <TextAlt>
          Não possui uma conta ?{' '}
          <Link style={{ color: 'blue' }} href="/signup">
            Faça seu cadastro
          </Link>
        </TextAlt>
      </FormContainer>
    </Container>
  )
}
