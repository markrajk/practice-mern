import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam } from '../../actions/teamActions'
import { Container, Title, Table } from './styles'

const TeamScreen = ({ match }) => {
  const dispatch = useDispatch()

  const gotTeam = useSelector((state) => state.getTeam)
  const { team, loading, error } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success } = updatedTeam

  const [teamName, setTeamName] = useState('')
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    // const initializeTeam = async () => {
    //   await dispatch(getTeam(match.params.id))
    // }

    if (!team || success) {
      dispatch(getTeam(match.params.id))
    }

    // if (!loading && !error) {
    //   initializeTeam()
    // }
  }, [dispatch, match.params.id, success])

  const handleUserDelete = (id) => {
    // setTeamMembers(team.members.map((member) => member._id))
    const newArr = team.members
      .map((member) => member._id)
      .filter((member) => member !== id)

    handleUpdate(team.name, newArr)
  }

  const handleUpdate = (name, members) => {
    dispatch(updateTeam(match.params.id, { name, members }))
  }

  return (
    <Container>
      <Title>{team && team.name}</Title>
      {/* <button onClick={handleUpdate(team.name, teamMembers)}>Update</button> */}
      {team &&
        (team.members || team.admins) &&
        (team.members[0] || team.admins[0] || team.owner) && (
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={`/users/${team.owner._id}`}>
                    {team.owner.fullName}
                  </Link>
                </td>
                <td>Owner</td>
                <td>
                  <button className="delete">Delete</button>
                </td>
              </tr>
              <>
                {team.admins.map((admin) => (
                  <tr>
                    <td>{admin.fullName}</td>
                    <td>Admin</td>
                    <td>
                      <button className="delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </>
              <>
                {team.members.map((member) => (
                  <tr>
                    <td>
                      <Link to={`/users/${member._id}`}>{member.fullName}</Link>
                    </td>
                    <td>Member</td>
                    <td>
                      <button
                        className="delete"
                        onClick={(e) => handleUserDelete(member._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        )}
    </Container>
  )
}

export default TeamScreen
