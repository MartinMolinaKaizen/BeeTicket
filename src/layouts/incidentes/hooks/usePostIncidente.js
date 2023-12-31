import apiAxios from '../../../services/config';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context/user';

function usePostIncidente() {

  const [loadingPost, setLoading] = useState(false);
  const [exitoPost, setExito] = useState(null);
  const { logout } = useContext(UserContext);

  const createIncident = (newIncident) => {
    setLoading(true)
    apiAxios.post("incidentes", newIncident, {
    }).then(response => {
      setExito(true)
    }).catch(error => {
      setExito(false)
      console.error('Request Error: ', error)
      if (error?.response?.statusText === "Forbidden") return logout()
    }).finally(() => setLoading(false))
  }

  return [createIncident, loadingPost, exitoPost]

}

export default usePostIncidente;