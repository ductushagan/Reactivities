import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface IProps {
  activity: Activity
  setEditMode: (editMode: boolean) => void
  setSelectedActivity: (activity: Activity | null) => void
}

const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditMode,
  setSelectedActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => setSelectedActivity(null)}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails
