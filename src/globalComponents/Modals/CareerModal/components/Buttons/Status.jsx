import React from 'react'

const Status = ({modalData, updateModalState}) => {
  const getStatus = (status) => {
    updateModalState("status", status)
  };
  return (
    <ul className="modal-status">
              <li
                className={`${modalData.status ? "active" : ""}`}
                onClick={() => getStatus(true)}
              >
                Aktiv
              </li>
              <li
                className={`${modalData.status ? "" : "active"}`}
                onClick={() => getStatus(false)}
              >
                Deaktiv
              </li>
            </ul>
  )
}

export default Status