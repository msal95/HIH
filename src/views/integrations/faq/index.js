// ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'


// ** Demo Components
import Faqs from './Faqs'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'
import { Spinner } from 'reactstrap'

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
      {data !== null ? <Faqs data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : <div className="d-flex justify-content-center align-items-center p-5">
            <Spinner type="grow" color="primary" />
        </div>}
    </Fragment>
  )
}

export default Faq
