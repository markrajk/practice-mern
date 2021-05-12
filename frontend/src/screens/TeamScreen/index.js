import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam, deleteTeam } from '../../actions/teamActions'
import { Container, Header, Title, Table, Editable } from './styles'
import LeadPencilIcon from '../../components/Icons/LeadPencilIcon'
import BxsSaveIcon from '../../components/Icons/BxsSaveIcon'

const TeamScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const gotTeam = useSelector((state) => state.getTeam)
  const { team, loading, error } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success, error: updateError } = updatedTeam

  const deletedTeam = useSelector((state) => state.deleteTeam)
  const { error: deleteError } = deletedTeam

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [edit, setEdit] = useState(false)
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    dispatch(getTeam(match.params.id))
    // if (!team || success) {
    //   dispatch(getTeam(match.params.id))
    // }
    error && alert(error)
    deleteError && alert(deleteError)
    updateError && alert(updateError)
  }, [dispatch, match.params.id, success, error, deleteError, updateError])

  const handleUserDelete = (e, id) => {
    console.log(e.currentTarget.disabled)
    if (e.currentTarget.disabled) return
    if (!window.confirm('Are you sure you want to delete this member')) return
    const newArr = team.members
      .map((member) => member._id)
      .filter((member) => member !== id)

    handleUpdate(undefined, newArr)
  }

  const handleTeamNameUpdate = (name) => {
    setTeamName(name)
    handleUpdate(teamName)
    setEdit(false)
  }

  const handleUpdate = (name, members) => {
    dispatch(updateTeam(match.params.id, { name, members }))
  }

  const deleteTeamHandler = () => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      dispatch(deleteTeam(match.params.id))
      history.push('/')
    }
  }

  return (
    <Container>
      <Header>
        <Title>
          <Editable
            edit={edit}
            suppressContentEditableWarning
            onInput={(e) => setTeamName(e.target.textContent)}
          >
            {team && team.name}
          </Editable>
        </Title>
        {team && userInfo._id === team.owner._id && (
          <>
            {!edit ? (
              <i onClick={() => setEdit(!edit)}>
                <LeadPencilIcon />
              </i>
            ) : (
              <i onClick={() => handleTeamNameUpdate(teamName)}>
                <BxsSaveIcon />
              </i>
            )}
            <button onClick={deleteTeamHandler}>Delete</button>
          </>
        )}
      </Header>

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
              <tr key={team.owner._id}>
                <td>
                  <Link to={`/users/${team.owner._id}`}>
                    {team.owner.fullName}
                  </Link>
                </td>
                <td>Owner</td>
                <td>{/* <button className="delete">Delete</button> */}</td>
              </tr>
              <>
                {team.admins.map((admin) => (
                  <tr key={admin._id}>
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
                  <tr key={member._id}>
                    <td>
                      <Link to={`/users/${member._id}`}>{member.fullName}</Link>
                    </td>
                    <td>Member</td>
                    <td>
                      <button
                        disabled={
                          !(
                            team &&
                            (userInfo._id === team.owner._id ||
                              team.admins.includes(userInfo))
                          )
                        }
                        className={
                          team &&
                          (userInfo._id === team.owner._id ||
                            team.admins.includes(userInfo)) &&
                          'delete'
                        }
                        onClick={(e) => handleUserDelete(e, member._id)}
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
