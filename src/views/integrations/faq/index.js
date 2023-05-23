// ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'
import { Col, Input, Label, Row } from 'reactstrap'

const Faq = (props) => {
  const [data, setData] = useState((props?.length > 0) ? props?.integrationFull : null),
    [searchTerm, setSearchTerm] = useState('')

  const getFAQData = query => {
      setData(props?.integrationFull)
  }

  useEffect(() => {
    getFAQData(searchTerm)
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title='Integration' data={[{ title: 'Resource' }, { title: 'Events' }]} />
      {/* <FaqFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} getFAQData={getFAQData} /> */}
      {data !== null ? <Faqs data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}
      {/* <FaqContact /> */}
    </Fragment>
  )
}

export default Faq
