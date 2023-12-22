import axios from 'axios';
import { urlBase } from '../../../services/config';
import { useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../../context/user';

function useGetProyectos(adapterProyects) {

  const { getToken, logout } = useContext(UserContext);
  const controller = useRef(new AbortController());

  const refreshProyect = () => {
    axios.get(urlBase + "proyectos", {
      headers: { Authorization: `Bearer ${getToken()}` },
      signal: controller.current.signal
    })
      .then(response => {
        if (controller.current) {
          const { data } = response
          if (data?.length > 0) {
            adapterProyects(data);
          }
        }
      })
      .catch(error => {
        console.error('Request Error: ', error);
        if (error?.response?.statusText === "Forbidden") return logout()
      })
  }

  const cancelCall = () => {
    controller.current.abort();
  }

  useEffect(() => {
    refreshProyect();
    return () => {
      cancelCall()
      controller.current = new AbortController();
    }
  }, []);

}

export default useGetProyectos;