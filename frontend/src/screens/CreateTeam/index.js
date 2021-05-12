import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTeam } from '../../actions/teamActions'
import SearchBox from '../../components/SearchBox'
import {
  Container,
  Title,
  SubTitle,
  Input,
  Label,
  ContentWrapper,
  Buttons,
  SubmitButton,
  CancelButton,
  Members,
  MemberItem,
} from './styles'
import BinIcon from '../../components/Icons/BinIcon'

const CreateTeamScreen = ({ history }) => {
  const dispatch = useDispatch()

  const createdTeam = useSelector((state) => state.createTeam)
  const { team: teamCreated, success } = createdTeam

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [team, setTeam] = useState({ name: '', members: [] })

  const handleAddUser = (user) => {
    if (
      team.members.some((el) => {
        return JSON.stringify(el) === JSON.stringify(user)
      }) ||
      userInfo._id === user._id
    )
      return
    setTeam({ ...team, members: [...team.members, user] })
  }

  const handleDeleteUser = (user) => {
    const updatedArr = team.members.filter((member) => member._id !== user._id)
    setTeam({ ...team, members: updatedArr })
  }

  const handleTeamCreate = (team) => {
    if (!team.name) return alert('Team must have name')

    const updatedArr = team.members.map((member) => member._id)
    setTeam({ ...team, members: updatedArr })

    console.log(team)
    dispatch(createTeam(team))
  }

  useEffect(() => {
    console.log(team)
    if (success && team) {
      history.push(`/teams/${teamCreated._id}`)
    }
  }, [success, history, team])

  return (
    <Container>
      <ContentWrapper>
        <Title>Create new team</Title>
        <SubTitle>Enter the fields bellow to create you team.</SubTitle>

        <Label htmlFor="team-name">Team name</Label>
        <Input
          type="text"
          id="team-name"
          onChange={(e) => setTeam({ ...team, name: e.currentTarget.value })}
        />

        <Label htmlFor="search-box">Team members</Label>
        <SearchBox addUser={handleAddUser} />
      </ContentWrapper>

      <Members>
        {team &&
          team.members.map((member) => (
            <MemberItem key={member._id}>
              <p>{member.fullName}</p>
              <i onClick={(e) => handleDeleteUser(member)}>
                <BinIcon />
              </i>
            </MemberItem>
          ))}
      </Members>

      <ContentWrapper style={{ paddingTop: '3em', marginTop: 'auto' }}>
        <Buttons>
          <CancelButton onClick={(e) => history.push('/')}>Cancel</CancelButton>
          <SubmitButton onClick={(e) => handleTeamCreate(team)}>
            Create team
          </SubmitButton>
        </Buttons>
      </ContentWrapper>
    </Container>
  )
}

export default CreateTeamScreen
