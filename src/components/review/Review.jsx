import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'

import EditCard from '../card/EditCard'

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 150px;
  @media (max-width: 473px) {
    padding: 60px 100px;
  }
`
const TilteContainer = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 498px) {
    flex-direction: column;
  }
`
const Title1 = styled.h3`
  font-size: 48px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`
const EditImg = styled.img`
  width: 18px;
  height: 18px;
`
const TrashImg = styled.img`
  width: 18px;
  height: 18px;
`
const TextEdit = styled.h3`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  text-decoration: underline;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
`
const TextDelete = styled(TextEdit)`
  color: ${(props) => props.theme.colors.error};
`
const StyledFlex = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 13px;
`
const CategoryContainer1 = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin: 15px 0;
`
const CategoryName1 = styled.h2`
  font-size: 17px;
  font-weight: 700;
  line-height: 17px;
  color: ${(props) => props.theme.colors.white};
`
const CategoryImg1 = styled.img`
  width: 20.98px;
  height: 20px;
`
const DatePosted1 = styled.h5`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  color: ${(props) => props.theme.colors.white};
`
const Price1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: rgba(0, 255, 10, 1);
  margin-top: 8px;
`
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`
const Description1 = styled.h3`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: 17px;
  margin: 10px 0;
  color: ${(props) => props.theme.colors.white};
`
const ContactContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 20px;
`
const PhoneImg = styled.img`
  width: 30.75px;
  height: 30.75px;
`
const Number = styled.h3`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.white};
`
const TextContact = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`

export default function Review({
  title,
  date,
  category,
  price,
  description,
  whatsapp,
  id,
  isOwner
}) {
  const { mutate } = useSWRConfig()
  const [editCard, setEditCard] = useState(false)
  const handleEdit = async () => {
    setEditCard(true)
  }
  const handleSaveEdit = () => {
    setEditCard(false)
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/card`)
  }
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/card`, {
        data: {
          id
        }
      })
      if (response.status === 200) mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/card`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ReviewContainer>
      <TilteContainer>
        <Title1>{!editCard && title}</Title1>
        <StyledFlex>
          <EditImg src="/edit.png" />
          <TextEdit onClick={handleEdit}>{editCard ? '-' : 'Editar'}</TextEdit>
        </StyledFlex>
        <StyledFlex>
          <TrashImg src="/trash.png" />
          <TextDelete onClick={handleDelete}>{editCard ? '-' : 'Deletar'}</TextDelete>
        </StyledFlex>
      </TilteContainer>
      <CategoryContainer1>
        <CategoryImg1 src="/car-white.png" />
        <CategoryName1>{!editCard && category}</CategoryName1>
      </CategoryContainer1>
      <DatePosted1>Postado {moment(date).format('LLL')}</DatePosted1>
      <Price1>R${!editCard && price}</Price1>
      <DescriptionContainer>
        <Description1>{!editCard && description}</Description1>
      </DescriptionContainer>
      {editCard && (
        <EditCard
          id={id}
          description={description}
          title={title}
          category={category}
          price={price}
          whatsapp={whatsapp}
          onSave={handleSaveEdit}
        />
      )}
      <TextContact>Gostou? Entre em contato</TextContact>
      <ContactContainer>
        <PhoneImg src="/phone.png" />
        <Number>{!editCard && '(+55) ' + whatsapp}</Number>
      </ContactContainer>
    </ReviewContainer>
  )
}
