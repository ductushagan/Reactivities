import React, { useState, useEffect, Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import axios from 'axios'
import { Activity } from '../models/activity'
import { NavBar } from '../../features/nav/NavBar'
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard'

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  )
  const [editMode, setEditMode] = useState(false)

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity: Activity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditActivity = (activity: Activity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        let activities: Activity[] = []
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity)
        })
        setActivities(activities)
      })
  }, [])

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  )
}

export default App
