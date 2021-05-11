import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/userActions'
import { Container, Input, Results, ResultsItem } from './styles'
import PropTypes from 'prop-types'

const SearchBox = ({ addUser }) => {
  const dispatch = useDispatch()

  const allUsers = useSelector((state) => state.getAllUser)
  const { users } = allUsers

  const [searchFocus, setSearchFocus] = useState(false)

  const handleChange = (queryStr) => {
    dispatch(getAllUsers(queryStr))
  }

  const handleAddUser = (user) => {
    addUser(user)
    setSearchFocus(false)
  }

  return (
    <Container>
      <Input
        id="search-box"
        type="text"
        onChange={(e) => handleChange(e.currentTarget.value)}
        // onBlur={(e) => setSearchFocus(false)}
        onFocus={(e) => setSearchFocus(true)}
      />
      {users && users[0] && searchFocus && (
        <Results>
          {users.map((user) => (
            <ResultsItem>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <button onClick={(e) => handleAddUser(user)}>Add</button>
            </ResultsItem>
          ))}
        </Results>
      )}
    </Container>
  )
}

Comment.propTypes = {
  addUser: PropTypes.func.isRequired,
}

export default SearchBox
