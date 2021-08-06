import {TextInputWithLabel} from '../../../../shared/components/input/TextInputWithLabel'
import {Panel} from '../../../../uikit/components/Panel'

const NewPatient = () => {
  return (
    <>
      <Panel title='Basic Information' collapsible color='primary'>
        <div className='row'>
          <div className='col-lg-2'>
            <TextInputWithLabel
              name='prefix'
              label='Prefix'
              placeholder='Prefix'
              type='text'
              value=''
              isEditable
            />
          </div>
          <div className='col-lg-4'>
            <TextInputWithLabel
              name='firstName'
              label='First Name'
              placeholder='First Name'
              type='text'
              value=''
              isEditable
              isRequired
            />
          </div>
          <div className='col-lg-4'>
            <TextInputWithLabel
              name='lastName'
              label='Last Name'
              placeholder='Last Name'
              type='text'
              value=''
              isEditable
              isRequired
            />
          </div>
          <div className='col-lg-2'>
            <TextInputWithLabel
              name='suffix'
              label='Suffix'
              placeholder='Suffix'
              type='text'
              value=''
              isEditable
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <TextInputWithLabel
              name='gender'
              label='Gender'
              placeholder='Gender'
              type='text'
              value=''
              isEditable
              isRequired
            />
          </div>
          <div className='col'>
            <TextInputWithLabel
              name='patientType'
              label='Patient Type'
              placeholder='New/Returning'
              type='text'
              value=''
              isEditable
              isRequired
            />
          </div>
          <div className='col'>
            <TextInputWithLabel
              name='bloodType'
              label='Blood Type'
              placeholder='Blood Type'
              type='text'
              value=''
              isEditable
            />
          </div>
        </div>
      </Panel>
      <br />
      <Panel title='Contact Information' color='primary'></Panel>
    </>
  )
}

export default NewPatient
