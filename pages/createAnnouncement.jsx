import styled from 'styled-components'

import NavBar from '../src/components/navbar/NavBar'
import Footer from '../src/components/footer/Footer'
import CreateCard from '../src/components/card/CreateCard'

const FooterAlt = styled(Footer)`
  margin-top: 0px;
`
export default function CreateAnnouncementPage() {
  return (
    <>
      <NavBar type2 />
      <CreateCard />
      <FooterAlt />
    </>
  )
}
