import CommonButton from './CommonButton'
import Popup from 'reactjs-popup'
import { PopupPosition } from 'reactjs-popup/dist/types'

function DefaultPopup(props: {
  closeOnDocumentClick?: boolean
  closeOnEscape?: boolean
  position?: PopupPosition | PopupPosition[] | undefined
  icon?: React.ReactElement
  title?: string
  description?: string
  children?: React.ReactElement
  buttons?: 'yesno' | 'ok' | 'okcancel' | 'gotit' | 'none'
  onYes?: () => void
  onNo?: () => void
  onOk?: () => void
  onCancel?: () => void
}) {
  return (
    <Popup
      defaultOpen={true}
      position={props.position ?? 'center center'}
      modal
      nested
      closeOnDocumentClick={props.closeOnDocumentClick ?? true}
      closeOnEscape={props.closeOnEscape ?? true}
    >
      {/* @ts-ignore */}
      {(close: any) => (
        <div className='bg-slate-800 w-full h-full border border-slate-900 rounded-[4px] flex flex-col'>
          <div className='flex flex-col p-9'>
            {props.icon != undefined ? (
              <div className='flex justify-start items-center gap-2'>
                {props.icon}
                <p className='text-white text-xl font-bold select-none'>
                  {props.title}
                </p>
              </div>
            ) : (
              <p className='text-white text-xl font-bold'>{props.title}</p>
            )}
            <p className='text-white text-sm mt-5 max-w-xl'>
              {props.description}
            </p>
            {props.children}
          </div>
          <div className='flex gap-2 mt-5 w-full justify-end bg-slate-900 p-5'>
            {props.buttons === 'yesno' && (
              <>
                <CommonButton
                  label='No'
                  type='error'
                  onClick={() => {
                    if (props.onNo != undefined) {
                      props.onNo()
                    }
                    close()
                  }}
                />
                <CommonButton
                  label='Yes'
                  type='success'
                  onClick={() => {
                    if (props.onYes != undefined) {
                      props.onYes()
                    }
                    close()
                  }}
                />
              </>
            )}
            {props.buttons === 'ok' && (
              <CommonButton
                label='Ok'
                type='secondary'
                onClick={() => {
                  if (props.onOk != undefined) {
                    props.onOk()
                  }
                  close()
                }}
              />
            )}
            {props.buttons === 'okcancel' && (
              <>
                <CommonButton
                  label='Cancel'
                  type='error'
                  onClick={() => {
                    if (props.onCancel != undefined) {
                      props.onCancel()
                    }
                    close()
                  }}
                />
                <CommonButton
                  label='Ok'
                  type='secondary'
                  onClick={() => {
                    if (props.onOk != undefined) {
                      props.onOk()
                    }
                    close()
                  }}
                />
              </>
            )}
            {props.buttons === 'gotit' && (
              <CommonButton
                label='Got it'
                type='secondary'
                onClick={() => {
                  if (props.onOk != undefined) {
                    props.onOk()
                  }
                  close()
                }}
              />
            )}
          </div>
        </div>
      )}
    </Popup>
  )
}

export default DefaultPopup
