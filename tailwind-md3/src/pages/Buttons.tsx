import { Button, ExtendedFAB, Fab } from '../../lib/main'

export const Buttons = () => {
  return (
    <div className="grid gap-4">
      <div>
        <h3>Filled Buttons</h3>
        <div>
          <Button variant="filled" color="primary" className="mr-2">
            Primary
          </Button>
          <Button variant="filled" color="secondary" className="mr-2">
            Secondary
          </Button>
          <Button variant="filled" color="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
      <div>
        <h3>Filled Buttons With Icon</h3>
        <div>
          <Button
            variant="filled"
            color="primary"
            icon="PencilSquare"
            className="mr-2"
          >
            Primary
          </Button>
          <Button
            variant="filled"
            color="secondary"
            icon="PencilSquare"
            className="mr-2"
          >
            Secondary
          </Button>
          <Button
            variant="filled"
            color="tertiary"
            icon="PencilSquare"
            className="mr-2"
          >
            Tertiary
          </Button>
        </div>
      </div>
      <div>
        <h3>Outlined Buttons</h3>
        <div>
          <Button variant="outlined" color="primary" className="mr-2">
            Primary
          </Button>
          <Button variant="outlined" color="secondary" className="mr-2">
            Secondary
          </Button>
          <Button variant="outlined" color="tertiary" className="mr-2">
            Tertiary
          </Button>
        </div>
      </div>
      <div>
        <h3>Outlined Buttons With Icon</h3>
        <div>
          <Button
            variant="outlined"
            color="primary"
            icon="PencilSquare"
            className="mr-2"
          >
            Primary
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            icon="PencilSquare"
            className="mr-2"
          >
            Secondary
          </Button>
          <Button
            variant="outlined"
            color="tertiary"
            icon="PencilSquare"
            className="mr-2"
          >
            Tertiary
          </Button>
        </div>
      </div>
      <div>
        <h3>Text Buttons</h3>
        <div>
          <Button variant="text" color="primary" className="mr-2">
            Primary
          </Button>
          <Button variant="text" color="secondary" className="mr-2">
            Secondary
          </Button>
          <Button variant="text" color="tertiary" className="mr-2">
            Tertiary
          </Button>
        </div>
      </div>
      <div>
        <h3>Text Buttons With Icon</h3>
        <div>
          <Button
            variant="text"
            color="primary"
            icon="PencilSquare"
            className="mr-2"
          >
            Primary
          </Button>
          <Button
            variant="text"
            color="secondary"
            icon="PencilSquare"
            className="mr-2"
          >
            Secondary
          </Button>
          <Button
            variant="text"
            color="tertiary"
            icon="PencilSquare"
            className="mr-2"
          >
            Tertiary
          </Button>
        </div>
        <div>
          <h3>FAB</h3>
          <div>
            <Fab color="primary" icon="PencilSquare" className="mr-2" />
            <Fab color="secondary" icon="PencilSquare" className="mr-2" />
            <Fab color="tertiary" icon="PencilSquare" className="mr-2" />
          </div>
        </div>
        <div>
          <h3>Extended FAB</h3>
          <div>
            <ExtendedFAB color="primary" icon="PencilSquare" className="mr-2">
              Primary
            </ExtendedFAB>
            <ExtendedFAB color="secondary" icon="PencilSquare" className="mr-2">
              Secondary
            </ExtendedFAB>
            <ExtendedFAB color="tertiary" icon="PencilSquare" className="mr-2">
              Tertiary
            </ExtendedFAB>
          </div>
        </div>
      </div>
    </div>
  )
}
