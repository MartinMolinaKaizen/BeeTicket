import axios from 'axios';
import { urlBase } from '../../../services/config';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/user';

function usePutIncidente() {

  const [loadingPut, setLoading] = useState(false);
  const [exitoPut, setExito] = useState(null);
  const { getToken, logout } = useContext(UserContext);

  const updateIncident = (editedIncident, id) => {
    setLoading(true)
    axios.patch(urlBase + "incidente/" + id, editedIncident, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    }).then(response => {
      setExito(true)
    }).catch(error => {
      setExito(false)
      console.error('Request Error: ', error)
      if (error?.response?.statusText === "Forbidden") return logout()
    }).finally(() => setLoading(false))
  }

  return [updateIncident, loadingPut, exitoPut]

}

export default usePutIncidente;