import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInvitation } from '../../../actions/invitationActions'
import { joinTeam } from '../../../actions/teamActions'
import {
  Container,
  DropdownButton,
  DropdownButtonNotification,
  DropdownMenu,
  DropdownMenuItem,
} from './styled'
import BellIcon from '../../Icons/BellIcon'
import PropTypes from 'prop-types'

const Notifications = ({ userInfo }) => {
  const dispatch = useDispatch()

  const deletedInvitation = useSelector((state) => state.deleteInvitation)
  const { success } = deletedInvitation

  const joinedTeam = useSelector((state) => state.joinTeam)
  const { success: teamJoinSuccess } = joinedTeam

  const [open, setOpen] = useState(false)

  const handleConfirm = (inv) => {
    dispatch(joinTeam(inv.team._id))
    handleDelete(inv._id)
  }

  const handleDelete = (id) => {
    dispatch(deleteInvitation(id))
  }

  useEffect(() => {}, [success])

  return (
    <Container>
      <DropdownButton onClick={(e) => setOpen(!open)}>
        <BellIcon />
        {userInfo.invitations && userInfo.invitations[0] && (
          <DropdownButtonNotification>
            {userInfo.invitations.length}
          </DropdownButtonNotification>
        )}
      </DropdownButton>
      {userInfo.invitations && userInfo.invitations[0] && (
        <DropdownMenu style={{ display: open ? 'block' : 'none' }}>
          {userInfo.invitations.map((inv) => (
            <>
              <DropdownMenuItem>
                <p>
                  You are invited by <span>{inv.sender.firstName}</span> to join{' '}
                  <span>{inv.team.name}</span> team.
                </p>
                <div className="buttons">
                  <button
                    className="delete"
                    onClick={(e) => handleDelete(inv._id)}
                  >
                    Delete
                  </button>
                  <button onClick={(e) => handleConfirm(inv)}>Accept</button>
                </div>
              </DropdownMenuItem>
            </>
          ))}
        </DropdownMenu>
      )}
    </Container>
  )
}

Notifications.propTypes = {
  userInfo: PropTypes.object.isRequired,
}

export default Notifications
