import styled from 'styled-components'
import { useController } from 'react-hook-form'

const ContainerBox = styled.div``

const StyledSelect = styled.select`
  padding: 10px;
  width: 504px;
  height: 47px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.textColor};
  :focus {
    outline: none;
  }
`
const StyledSelectAlt = styled.select`
  border: 0;
  outline: none;
  font-weight: bold;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  font-style: italic;
`
const ContainerSelect = styled.div`
  display: flex;
  gap: 3px;
`
const Line = styled.div`
  height: 100%;
  width: 1px;
  background-color: red;
  background-color: ${(props) => props.theme.textColor};
`
export default function Selecter({
  name,
  control,
  defaultValue = '',
  onChange,
  type1,
  type2,
  ...props
}) {
  const {
    field: { value, onChange: onControllerChange }
  } = useController({ name, control, defaultValue })

  const handleChange = (e) => {
    onControllerChange(e)
    onChange(e.target.value)
  }
  return (
    <ContainerBox>
      {type1 && (
        <StyledSelect {...props} value={value} onChange={handleChange}>
          <option value="" disabled>
            Selecione sua categoria
          </option>
          <option value="Carros">Carros</option>
          <option value="Roupas e acessórios">Roupas e acessórios</option>
          <option value="Eletrônicos">Eletrônicos</option>
        </StyledSelect>
      )}
      {type2 && (
        <ContainerSelect>
          <Line />
          <StyledSelectAlt {...props} value={value} onChange={handleChange}>
            <option value="">Todas as categorias</option>
            <option value="Carros">Carros</option>
            <option value="Roupas e acessórios">Roupas e acessórios</option>
            <option value="Eletrônicos">Eletrônicos</option>
          </StyledSelectAlt>
        </ContainerSelect>
      )}
    </ContainerBox>
  )
}
