import styled from 'styled-components'

import { useController } from 'react-hook-form'

const ContainerBox = styled.div`
  width: auto;
  height: auto;
`
const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.colors.textColor};
  padding: 12px 20px;
  width: 504px;
  height: 46px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.inputBackground};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const StyledInputContainerAlt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const StyledInputContainerAlt1 = styled.div`
  color: ${(props) => props.theme.colors.textColor};
  padding: 12px 20px;
  width: 100%;
`

const StyledInput = styled.input`
  border: 0;
  outline: none;
  font-weight: bold;
  background: transparent;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  border: ${(props) => props.onError && `border: 2px solid ${props.theme.colors.error}`};
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.textColor};
  }
`
const StyledInputAlt = styled(StyledInput)`
  ::placeholder {
    font-size: 18px;
    font-weight: 400;
  }
`
const StyledInputAlt1 = styled(StyledInput)`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.inputBackground};
`
const Lupa = styled.img`
  width: 18px;
  height: 18px;
`
const StyledLabel = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.white};
`
const ErrorLabel = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-weight: bold;
  font-size: 14px;
`
const errorMessage = {
  'string.empty': 'Este campo é obrigatório.',
  'string.email': 'Por favor,digite um email válido.',
  duplicated: 'Ja existe uma conta com esse valor. '
}

export default function Input({
  type1,
  type2,
  type3,
  label,
  placeholder,
  name,
  control,
  defaultValue = '',
  ...props
}) {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({ name, control, defaultValue })
  return (
    <ContainerBox>
      {type1 && (
        <StyledInputContainerAlt {...props}>
          <Lupa src="/lupa.png" />
          <StyledInput
            placeholder="Digite o que procura"
            error={error}
            value={value}
            onChange={onChange}
          />
        </StyledInputContainerAlt>
      )}
      {type2 && (
        <StyledInputContainer {...props}>
          <StyledInputAlt
            placeholder={placeholder}
            error={error}
            value={value}
            onChange={onChange}
          />
        </StyledInputContainer>
      )}
      {type3 && (
        <StyledInputContainerAlt1 {...props}>
          <StyledLabel> {label}</StyledLabel>
          <StyledInputAlt1 placeholder={label} error={error} value={value} onChange={onChange} />
          {error && <ErrorLabel> {errorMessage[error.type] || error.message}</ErrorLabel>}
        </StyledInputContainerAlt1>
      )}
    </ContainerBox>
  )
}
