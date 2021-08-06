import { Route, Switch } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import AddStaff from './staff/AddStaff'

const AdministrationPage = () => {
  return (
    <Switch>
      <Route path="/administration/staff/new" component={AddStaff}/>
      <Route path="/administration" component={AdminDashboard}/>
    </Switch>
  )
}

export default AdministrationPage
