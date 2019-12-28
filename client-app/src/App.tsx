import React, { Component } from 'react'
import { Header, Icon, List } from 'semantic-ui-react'
import './App.css'
import axios from 'axios'

type Value = {
  id: number
  name: string
}

type AppState = {
  values: ReadonlyArray<Value>
}

class App extends Component<{}, AppState> {
  state: AppState = {
    values: []
  }

  componentDidMount() {
    axios
      .get<ReadonlyArray<Value>>('http://localhost:5000/api/values')
      .then(response => this.setState({ values: response.data }))
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map(value => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}

export default App
