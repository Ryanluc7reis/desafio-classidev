import styled from 'styled-components'
import moment from 'moment'

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 110px;
  width: 100%;
`
const StyledCard = styled.div`
  width: 334px;
  height: 313px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background: rgba(217, 217, 217, 1);
  padding: 25px;
  @media (max-width: 375px) {
    width: 270px;
    height: 295px;
  }
`
const Title = styled.h2`
  font-size: 39px;
  font-weight: 700;
  line-height: 44px;
  text-align: left;
`
const DatePosted = styled.h5`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: 17px;
  text-align: left;
  color: ${(props) => props.theme.colors.textSubColor};
`
const Price = styled.h4`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`
const Description = styled.p`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: 17px;
  text-align: left;
  color: ${(props) => props.theme.textSubColor};
`
const CategoryContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 28px;
`
const CategoryName = styled.h2`
  font-size: 17px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`
const CategoryImg = styled.img`
  width: 23.98px;
  height: 20px;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export default function Card({ title, date, price, description, category }) {
  return (
    <CardContainer>
      <StyledCard>
        <HeaderContainer>
          <Title>{title}</Title>
          <DatePosted>{moment(date).format('LLL')}</DatePosted>
          <Price>{'R$ ' + price}</Price>
        </HeaderContainer>
        <Description>{description}</Description>
        <CategoryContainer>
          <CategoryImg
            src={
              category === 'Roupas e acessórios'
                ? '/roupas.png'
                : category === 'Eletrônicos'
                ? '/pc.png'
                : category === 'Carros'
                ? '/car.png'
                : ''
            }
          />
          <CategoryName>{category}</CategoryName>
        </CategoryContainer>
      </StyledCard>
    </CardContainer>
  )
}
