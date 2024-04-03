import { useDialog } from '../../lib/components/Dialog/useDialog'
import { Button } from '../../lib/main'

export const DialogPage = () => {
  const { DialogComponent, showModal, closeModal } = useDialog()
  return (
    <div>
      <button
        onClick={() => {
          showModal()
        }}
      >
        Open
      </button>
      <DialogComponent
        headline="head"
        supportingText="sup"
        leftButton={<Button variant="text" onClick={closeModal} />}
      ></DialogComponent>
      {/* <div>
        <Dialog
          headline="headline"
          supportingText="foobar"
          leftButtonText="Cancel"
          onLeftButtonClick={() => console.log('left button clicked')}
          rightButtonText="Accept"
          onRightButtonClick={() => console.log('right button clicked')}
          open={true}
        />
      </div> */}

      <div></div>
    </div>
  )
}
