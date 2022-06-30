import axios from 'axios'
import { useEffect, useState } from 'react'
import UpdateModal from './components/UpdateModal'
import List from './components/List'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Pagination from './components/Pagination'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [searchText, setSearchText] = useState('')

  // Modal related
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({})
  const handleClose = () => setShow(false)

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await axios.get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      )
      setUsers(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Searching
  const searchTerm = searchText.toLowerCase()
  const termLength = searchText.length > 2
  const filteredUsers = users.filter((user) => {
    if (searchText === '') {
      return true
    } else if (termLength) {
      if (user.name.toLowerCase().includes(searchTerm)) {
        return true
      } else if (user.role.toLowerCase().includes(searchTerm)) {
        return true
      } else if (user.email.includes(searchTerm)) {
        return true
      }
    } else {
      return true
    }
    return false
  })

  // Get Current Users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Selecting a user for deletion
  const selectThis = (user) => {
    if (selected.some((x) => x.id === user.id)) {
      return setSelected((prevState) =>
        prevState.filter((x) => x.id !== user.id)
      )
    }
    setSelected((prevState) => prevState.concat(user))
  }

  // Selecting all users on page
  const selectAll = (users, reset) => {
    if (reset) {
      return setSelected([])
    }
    setSelected((prevState) => prevState.concat(...users))
  }

  // Deleting selection
  const deleteSelectedList = () => {
    const theSet = new Set(selected)
    const newArr = users.filter((name) => {
      return !theSet.has(name)
    })
    setUsers(newArr)
    setSelected([])
  }

  // Deleting single user
  const deleteThis = (userId) => {
    setUsers((prevState) => {
      const haha = prevState.filter((h) => h.id !== userId)
      return haha
    })
    setSelected([])
  }

  return (
    <Container className='mb-5 d-flex flex-column' style={{ height: '100vh' }}>
      <h1
        className='text-center mb-4 mt-4'
        style={{ flexGrow: 0, flexBasis: 'auto' }}
      >
        Users' List
      </h1>
      <input
        type='text'
        placeholder='Please enter 3 or more characters'
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        className='form-control'
      />
      <div
        style={{ flexGrow: 1, flexBasis: 'auto' }}
        className='d-flex justify-content-center align-items-center flex-column'
      >
        {loading ? (
          <Spinner
            animation='border'
            style={{ height: '100px', width: '100px', borderWidth: '10px' }}
          />
        ) : (
          <>
            <List
              users={currentUsers}
              setModalData={setModalData}
              selectThis={selectThis}
              selectAll={selectAll}
              deleteThis={deleteThis}
              selected={selected}
              setShow={setShow}
            />

            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={filteredUsers.length}
              paginate={paginate}
            />

            <div className='d-flex justify-content-center align-items-center'>
              {selected.length > 0 && (
                <Button onClick={deleteSelectedList}>Delete Selected</Button>
              )}
            </div>
          </>
        )}
      </div>

      <UpdateModal
        modalData={modalData}
        show={show}
        handleClose={handleClose}
      />
    </Container>
  )
}

export default App
