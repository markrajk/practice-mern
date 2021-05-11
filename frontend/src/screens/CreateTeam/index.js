import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTeam } from '../../actions/teamActions'
import SearchBox from '../../components/SearchBox'
import {
  Container,
  Title,
  SubTitle,
  InputContainer,
  Input,
  Label,
  Button,
  ContentWrapper,
  SubmitButton,
} from './styles'

const CreateTeamScreen = ({ history }) => {
  const dispatch = useDispatch()

  const createdTeam = useSelector((state) => state.createTeam)
  const { team: teamCreated, success } = createdTeam

  const [team, setTeam] = useState({ name: '', members: [] })

  const handleAddUser = (user) => {
    setTeam({ ...team, members: [...team.members, user._id] })
  }

  const handleTeamCreate = (team) => {
    if (!team.name) return alert('Team must have name')

    console.log(team)
    dispatch(createTeam(team))
  }

  useEffect(() => {
    console.log(team, 'FROM EFFECTS!')
    if (success && team) {
      history.push(`/teams/${teamCreated._id}`)
    }
  }, [success, history, team])

  return (
    <Container>
      <ContentWrapper>
        <Title>Create new team</Title>
        <SubTitle>Enter the fields bellow to create you team.</SubTitle>

        <Label for="team-name">Team name</Label>
        <Input
          type="text"
          id="team-name"
          onChange={(e) => setTeam({ ...team, name: e.currentTarget.value })}
        />

        <Label for="search-box">Team members</Label>
        <SearchBox addUser={handleAddUser} />

        <SubmitButton onClick={(e) => handleTeamCreate(team)}>
          Create team
        </SubmitButton>
      </ContentWrapper>
    </Container>
  )
}

export default CreateTeamScreen
