import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, updateTeam, deleteTeam } from '../../actions/teamActions'
import { Container, Content, Header, Title, Table, Editable } from './styles'
import SearchBox from '../../components/SearchBox'
import LeadPencilIcon from '../../components/Icons/LeadPencilIcon'
import BxsSaveIcon from '../../components/Icons/BxsSaveIcon'

const TeamScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const gotTeam = useSelector((state) => state.getTeam)
  const { team, success: getTeamSuccess, loading, error } = gotTeam

  const updatedTeam = useSelector((state) => state.updateTeam)
  const { success, error: updateError } = updatedTeam

  const deletedTeam = useSelector((state) => state.deleteTeam)
  const { error: deleteError } = deletedTeam

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [edit, setEdit] = useState(false)
  const [teamName, setTeamName] = useState('')

  const [editEach, setEditEach] = useState({})

  const rowElements = useRef(new Array())

  const getRef = (element) => rowElements.current.push(element)

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

  const handleJobTitleEdit = (id) => {
    console.log(id)
    let strObj = `{`

    Array.from([...team.members, ...team.admins, team.owner]).forEach((e) => {
      console.log(e._id === id)
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

    console.log(editEach)
  }

  useEffect(() => {
    dispatch(getTeam(match.params.id))

    error && alert(error)
    deleteError && alert(deleteError)
    updateError && alert(updateError)
  }, [dispatch, match.params.id, success, error, deleteError, updateError])

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
                  <td>
                    <Editable
                      edit={edit}
                      suppressContentEditableWarning
                      onInput={(e) => setTeamName(e.target.textContent)}
                    >
                      {team.owner.jobTitle
                        ? team.owner.jobTitle
                        : 'No job title'}
                    </Editable>
                  </td>
                  <td>{/* <button className="delete">Delete</button> */}</td>
                </tr>
                <>
                  {team.admins.map((admin) => (
                    <tr key={admin._id} ref={getRef}>
                      <td>{admin.fullName}</td>
                      <td>Admin</td>
                      <Editable
                        edit={edit}
                        suppressContentEditableWarning
                        onInput={(e) => setTeamName(e.target.textContent)}
                      >
                        {admin.jobTitle ? admin.jobTitle : 'No job title'}
                      </Editable>

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
                        <Editable
                          edit={editEach[`${member._id}`]}
                          suppressContentEditableWarning
                          onInput={(e) => setTeamName(e.target.textContent)}
                        >
                          {member.jobTitle ? member.jobTitle : 'No job title'}
                        </Editable>

                        {!editEach[`${member._id}`] ? (
                          <i
                            className="edit"
                            onClick={(e) => handleJobTitleEdit(member._id)}
                          >
                            <LeadPencilIcon />
                          </i>
                        ) : (
                          <i
                            className="save"
                            onClick={(e) => handleJobTitleEdit(member._id)}
                          >
                            <BxsSaveIcon />
                          </i>
                        )}
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
      </Content>
    </Container>
  )
}

export default TeamScreen
