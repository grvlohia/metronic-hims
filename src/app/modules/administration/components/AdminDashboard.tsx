import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'

const AdminDashboard = () => {
  return (
    <div className='row bg-white rounded-3'>
      <div className='col bg-light-success px-6 py-8 rounded-2 m-7'>
        <KTSVG
          path='/media/icons/duotone/Communication/Add-user.svg'
          className='svg-icon-3x svg-icon-success d-block my-2'
        />
        <Link to='/administration/staff/new' className='text-success fw-bold fs-6'>
          Add New Staff
        </Link>
      </div>

      <div className='col bg-light-warning px-6 py-8 rounded-2 m-7'>
        <KTSVG
          path='/media/icons/duotone/Communication/Delete-user.svg'
          className='svg-icon-3x svg-icon-warning d-block my-2'
        />

        <Link to='/administration/staff' className='text-warning fw-bold fs-6'>
          View Staff Members
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
