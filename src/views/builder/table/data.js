import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { API_URL_LOCAL } from '../../../../api/localEndPoint'

// ** Vars
// const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}
export let data
// ** Get initial Data
API_URL_LOCAL.get(`/api/form-builder/get-editor-all-form`).then(response => {
  data = response?.data?.data
  console.log('✅ data    ', data)
})
// axios.get('/api/datatables/initial-data').then(response => {
//     data = response.data
//     console.log('✅ data    ', data)

//   })
// data = getEditorAllForm()
// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}
// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: row => row.status,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]
export default ExpandableTable
