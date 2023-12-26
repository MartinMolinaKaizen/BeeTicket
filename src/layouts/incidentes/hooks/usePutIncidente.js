import apiAxios from '../../../services/config';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/user';

function usePutIncidente() {

  const [loadingPut, setLoading] = useState(false);
  const [exitoPut, setExito] = useState(null);
  const { logout } = useContext(UserContext);

  const updateIncident = (editedIncident, id) => {
    setLoading(true)
    apiAxios.patch("incidente/" + id, editedIncident, {
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