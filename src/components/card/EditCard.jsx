import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'

import { createCardSchema } from '../../../modules/card/card.schema'

import Button from '../form/Button'
import Input from '../form/Input'
import Selecter from '../form/Selecter'

const InputAlt2 = styled(Input)`
  margin: 7px 0px;
`
const InputAlt = styled(Input)`
  height: 126px;
  margin: 7px 0px;
  ::placeholder {
    align-items: flex-end;
  }
`
const EditCard = ({ id, title, whatsapp, price, description, category, onSave }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    resolver: joiResolver(createCardSchema),
    mode: 'all'
  })

  const handleSaveEdit = async (data) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/card`, {
        id,
        title: data.title,
        price: data.price,
        description: data.description,
        whatsapp: data.whatsapp,
        category: data.category
      })

      if (response.status === 200) {
        onSave()
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <form onSubmit={handleSubmit(handleSaveEdit)}>
      <InputAlt2
        placeholder="Nome do produto"
        name="title"
        control={control}
        defaultValue={title}
        type2
      />
      <Selecter
        placeholder="Selecione a categoria"
        name="category"
        control={control}
        defaultValue={category}
        type1
      />

      <InputAlt2 placeholder="Preço" name="price" control={control} defaultValue={price} type2 />
      <InputAlt2
        placeholder="Whatsapp"
        name="whatsapp"
        control={control}
        defaultValue={whatsapp}
        type2
      />
      <InputAlt
        placeholder="Descrição"
        name="description"
        control={control}
        defaultValue={description}
        type2
      />
      <Button disabled={!isValid}>Salvar alterações </Button>
    </form>
  )
}
export default EditCard
