import {
  BsPatchCheck,
  BsPatchCheckFill,
  BsTrash,
  BsPencilSquare,
} from 'react-icons/bs'
import Table from 'react-bootstrap/Table'
import { useState } from 'react'

function List({
  users,
  setModalData,
  deleteThis,
  selectThis,
  selectAll,
  selected,
  setShow,
}) {
  const [selectAllButton, setSelectAllButton] = useState(false)

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th
            onClick={() => {
              selectAll(users, selectAllButton)
              setSelectAllButton(!selectAllButton)
            }}
            className='fs-4 text-primary text-center'
          >
            {selectAllButton ? <BsPatchCheckFill /> : <BsPatchCheck />}
          </th>
          <th>ID</th>
          <th>NAME</th>
          <th>ROLE</th>
          <th>EMAIL</th>
          <th>UPDATE</th>
          <th>DELETE</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td
              onClick={() => selectThis(user)}
              className='fs-4 text-primary text-center'
            >
              {selected?.some((x) => x.id === user.id) ? (
                <BsPatchCheckFill />
              ) : (
                <BsPatchCheck />
              )}
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td
              onClick={() => {
                setModalData(user)
                setShow(true)
              }}
              className='text-center text-success fs-5'
            >
              <BsPencilSquare />
            </td>
            <td
              onClick={() => deleteThis(user.id)}
              className='text-center text-danger fs-5'
            >
              <BsTrash />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default List
