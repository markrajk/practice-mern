import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam, deleteTeam } from '../../actions/teamActions'
import { updateUser } from '../../actions/userActions'
import { Container, Content, Header, Title, Table, Editable } from './styles'
import SearchBox from '../../components/SearchBox'
import LeadPencilIcon from '../../components/Icons/LeadPencilIcon'
import BxsSaveIcon from '../../components/Icons/BxsSaveIcon'

const TeamScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const gotTeam = useSelector((state) => state.getTeam)
  const { team, error } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success, error: updateError } = updatedTeam

  const deletedTeam = useSelector((state) => state.deleteTeam)
  const { error: deleteError } = deletedTeam

  const updatedUser = useSelector((state) => state.updateUser)
  const { error: updateUserError, success: updateUserSuccess } = updatedUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [edit, setEdit] = useState(false)
  const [teamName, setTeamName] = useState('')

  const [editEach, setEditEach] = useState({})
  const [jobTitle, setJobTitle] = useState(null)

  const rowElements = useRef([])

  const getRef = (element) => rowElements.current.push(element)

  const isAdmin = (team) => {
    if (team.admins.some((user) => user._id === userInfo._id)) return true
    return false
  }

  const isOwner = (team) => {
    if (team.owner._id === userInfo._id) return true
    return false
  }

  const handleAddUser = (user) => {
    if (
      team.members.some((el) => {
        return JSON.stringify(el) === JSON.stringify(user)
      }) ||
      userInfo._id === user._id
    )
      return

    const newArr = [...team.members, user].map((member) => member._id)

    handleUpdate(undefined, newArr)
  }

  const handleUserDelete = (e, id) => {
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

  const handleJobTitleEdit = (id) => {
    let strObj = `{`

    Array.from([...team.members, ...team.admins, team.owner]).forEach((e) => {
      if (e._id === id) {
        strObj += `"${e._id}": true,`
      } else {
        strObj += `"${e._id}": false,`
      }
    })

    strObj = strObj.substring(0, strObj.length - 1)
    strObj += '}'

    const newObj = JSON.parse(strObj)

    setEditEach(newObj)
    // setEditEach({ ...newObj, ...(editEach[`${id}`] = !newObj[`${id}`]) })
  }

  const updateJobTitle = (id) => {
    if (jobTitle === '') setJobTitle(undefined)
    dispatch(updateUser(id, { jobTitle: jobTitle }))
    handleJobTitleEdit(null)
  }

  // const setJobTitle = (role, value) => {}

  useEffect(() => {
    dispatch(getTeam(match.params.id))

    error && alert(error)
    deleteError && alert(deleteError)
    updateError && alert(updateError)
    updateUserError && alert(updateUserError)
  }, [
    dispatch,
    match.params.id,
    success,
    error,
    deleteError,
    updateError,
    updateUserSuccess,
    updateUserError,
  ])

  return (
    <Container>
      <Content>
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
                  <th>Job Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="input-row">
                  <td colSpan="4">
                    <SearchBox addUser={handleAddUser} />
                  </td>
                </tr>
                <tr key={team.owner._id} ref={getRef}>
                  <td>
                    <Link to={`/users/${team.owner._id}`}>
                      {team.owner.fullName}
                    </Link>
                  </td>
                  <td>Owner</td>
                  <td className="job-title">
                    <div>
                      <Editable
                        edit={editEach[`${team.owner._id}`]}
                        suppressContentEditableWarning
                        onInput={(e) => setJobTitle(e.target.textContent)}
                      >
                        {team.owner.jobTitle
                          ? team.owner.jobTitle
                          : 'No job title'}
                      </Editable>

                      {isOwner(team) && (
                        <>
                          {!editEach[`${team.owner._id}`] ? (
                            <i
                              className="edit"
                              onClick={(e) =>
                                handleJobTitleEdit(team.owner._id)
                              }
                            >
                              <LeadPencilIcon />
                            </i>
                          ) : (
                            <i
                              className="save"
                              onClick={(e) => updateJobTitle(team.owner._id)}
                            >
                              <BxsSaveIcon />
                            </i>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td>{/* <button className="delete">Delete</button> */}</td>
                </tr>
                <>
                  {team.admins.map((admin) => (
                    <tr key={admin._id} ref={getRef}>
                      <td>{admin.fullName}</td>
                      <td>Admin</td>
                      <td className="job-title">
                        <div>
                          <Editable
                            edit={editEach[`${admin._id}`]}
                            suppressContentEditableWarning
                            onInput={(e) => setJobTitle(e.target.textContent)}
                          >
                            {admin.jobTitle ? admin.jobTitle : 'No job title'}
                          </Editable>

                          {isOwner(team) && (
                            <>
                              {!editEach[`${admin._id}`] ? (
                                <i
                                  className="edit"
                                  onClick={(e) => handleJobTitleEdit(admin._id)}
                                >
                                  <LeadPencilIcon />
                                </i>
                              ) : (
                                <i
                                  className="save"
                                  onClick={(e) => updateJobTitle(admin._id)}
                                >
                                  <BxsSaveIcon />
                                </i>
                              )}
                            </>
                          )}
                        </div>
                      </td>

                      <td>
                        <button className="delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </>
                <>
                  {team.members.map((member) => (
                    <tr key={member._id} ref={getRef}>
                      <td>
                        <Link to={`/users/${member._id}`}>
                          {member.fullName}
                        </Link>
                      </td>
                      <td>Member</td>
                      <td className="job-title">
                        <div>
                          <Editable
                            edit={editEach[`${member._id}`]}
                            suppressContentEditableWarning
                            onInput={(e) => setJobTitle(e.target.textContent)}
                          >
                            {member.jobTitle ? member.jobTitle : 'No job title'}
                          </Editable>

                          {isAdmin(team) ||
                            (isOwner(team) && (
                              <>
                                {!editEach[`${member._id}`] ? (
                                  <i
                                    className="edit"
                                    onClick={(e) =>
                                      handleJobTitleEdit(member._id)
                                    }
                                  >
                                    <LeadPencilIcon />
                                  </i>
                                ) : (
                                  <i
                                    className="save"
                                    onClick={(e) => updateJobTitle(member._id)}
                                  >
                                    <BxsSaveIcon />
                                  </i>
                                )}
                              </>
                            ))}
                        </div>
                      </td>
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
                              team.admins.includes(userInfo))
                              ? 'delete'
                              : ''
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
      </Content>
    </Container>
  )
}

export default TeamScreen
