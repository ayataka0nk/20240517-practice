import React from 'react'
import { Card } from '../../lib/components/Card'

const CardsBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-96 grid gap-4">{children}</div>
}

export const Cards = () => {
  return (
    <div className="grid gap-4">
      <div>
        <h3>Filled Card</h3>
        <CardsBox>
          <Card variant="filled" bg="surface-container-lowest">
            Filled, Surface Container Lowest
          </Card>
          <Card variant="filled" bg="surface-container-low">
            Filled, Surface Container Low
          </Card>
          <Card variant="filled" bg="surface-container">
            Filled, Surface Container
          </Card>
          <Card variant="filled" bg="surface-container-high">
            Filled, Surface Container High
          </Card>
          <Card variant="filled" bg="surface-container-highest">
            Filled, Surface Container Highest
          </Card>
          <Card variant="filled" bg="surface">
            Filled, Surface
          </Card>
        </CardsBox>
      </div>
      <div>
        <h3>Interactive Variation</h3>
        <CardsBox>
          <Card variant="filled" component="button">
            Clickable
          </Card>
        </CardsBox>
      </div>
      <div>
        <h3>Elevated Card Color Variation</h3>
        <CardsBox>
          <Card variant="elevated" bg="surface-container-lowest">
            Elevated, Surface Container Lowest
          </Card>
          <Card variant="elevated" bg="surface-container-low">
            Elevated, Surface Container Low
          </Card>
          <Card variant="elevated" bg="surface-container">
            Elevated, Surface Container
          </Card>
          <Card variant="elevated" bg="surface-container-high">
            Elevated, Surface Container High
          </Card>
          <Card variant="elevated" bg="surface-container-highest">
            Elevated, Surface Container Highest
          </Card>
          <Card variant="elevated" bg="surface">
            Elevated, Surface
          </Card>
        </CardsBox>
      </div>
      <div>
        <h3>Elevated Card Interactive Variation</h3>
        <CardsBox>
          <Card variant="elevated" component="button">
            Clickable
          </Card>
        </CardsBox>
      </div>
      <div>
        <h3>Outlined Card Color Variation</h3>
        <CardsBox>
          <Card variant="outlined" bg="surface-container-lowest">
            Outlined, Surface Container Lowest
          </Card>
          <Card variant="outlined" bg="surface-container-low">
            Outlined, Surface Container Low
          </Card>
          <Card variant="outlined" bg="surface-container">
            Outlined, Surface Container
          </Card>
          <Card variant="outlined" bg="surface-container-high">
            Outlined, Surface Container High
          </Card>
          <Card variant="outlined" bg="surface-container-highest">
            Outlined, Surface Container Highest
          </Card>
          <Card variant="outlined" bg="surface">
            Outlined, Surface
          </Card>
        </CardsBox>
      </div>
      <div>
        <h3>Outlined Card Interactive Variation</h3>
        <CardsBox>
          <Card variant="outlined" component="button">
            Clickable
          </Card>
        </CardsBox>
      </div>
    </div>
  )
}
