import clsx from 'clsx'
import {KTSVG} from '../../../_metronic/helpers'
import {ColorVariant} from '../../interfaces'

interface Props {
  /** Defines the color of the panel */
  color?: ColorVariant
  /** The body for the panel */
  children?: React.ReactNode
  /** The title for the panel */
  title?: string
  /** The footer for the panel */
  footer?: string
  /** Determines if the panel can be collapsible */
  collapsible?: boolean
  /** Determines if the panel should be collapsed */
  collapsed?: boolean
  /** The className for the panel card parent element */
  className?: string
}

const Panel = (props: Props) => {
  const {children, className, collapsed, collapsible, color, footer, title} = props
  return (
    <div className={clsx('card', `border border-${color}`, className)}>
      {title && (
        <div
          className='card-header'
          style={collapsible ? {cursor: 'pointer', textAlign: 'left', alignItems: 'center'} : {textAlign: 'left', alignItems: 'center'}}
        >
          {title}
          {collapsible && (
            <a
              data-bs-toggle='collapse'
              href='#collapsible-card-body'
              className={clsx(
                'btn btn-link btn-color-muted btn-active-color-primary rotate collapsible',
                collapsed && 'collapsed'
              )}
            >
              <span className='svg-icon svg-icon-3 rotate-90 ms-1'>
                <KTSVG path='/media/icons/duotone/Navigation/Angle-right.svg' />
              </span>
            </a>
          )}
        </div>
      )}

      <div className={clsx('card-body', collapsible && 'collapse', !collapsed ? 'show' : '')} id='collapsible-card-body'>
        {children}
      </div>

      {footer && <div className='card-footer'>{footer}</div>}
    </div>
  )
}

export {Panel}
