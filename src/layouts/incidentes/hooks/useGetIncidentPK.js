import axios from 'axios';
import { urlBase } from '../../../services/config';
import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../context/user';

function useGetIncidentPK() {
  const { state } = useLocation();
  const [indicentEdit, setIncidentEdit] = useState({});
  const [editar, setEditar] = useState(false);
  const { getToken, logout } = useContext(UserContext);

  const controller = useRef(new AbortController());

  const refreshIncByPK = () => {
    if (state) {
      setEditar(true);
      axios.get(urlBase + "incidente/" + state.incidente_id, {
        headers: { Authorization: `Bearer ${getToken()}` },
        signal: controller.current.signal
      })
        .then(response => {
          if (controller.current) {
            setIncidentEdit(response?.data)
          }
        })
        .catch(error => {
          console.error('Request Error: ', error);
          if (error?.response?.statusText === "Forbidden") logout()
        })
    }
  }

  const cancelCall = () => {
    controller.current.abort();
  }

  useEffect(() => {
    refreshIncByPK();
    return () => {
      cancelCall()
      controller.current = new AbortController();
    }
  }, []);

  return [editar, indicentEdit]

}

export default useGetIncidentPK;