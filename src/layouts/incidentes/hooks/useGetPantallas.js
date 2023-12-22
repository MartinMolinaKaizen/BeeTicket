import axios from 'axios';
import { urlBase } from '../../../services/config';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../../context/user';

function useGetPantallas() {

  const [menu, setMenu] = useState([]);
  const [titulos, setTitulos] = useState([]);
  const { getToken, logout } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(null);

  const controller = useRef(new AbortController());

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const refreshPantallas = () => {
    setIsAdmin(user?.proyecto === 'admin');

    if (user?.proyecto === 'admin') {
      axios.get(urlBase + "pantallas/all", {
        headers: { Authorization: `Bearer ${getToken()}` },
        signal: controller.current.signal
      }).then(response => {
        if (controller.current) {
          let m = response.data.map(({ pantalla_id, pantalla_desc }) => ({ pantalla_id, pantalla_desc }));
          setMenu(m);
          let t = response.data.map((screen) => screen.proyecto);
          setTitulos(t);
        }
      })
        .catch(error => {
          console.error('Request Error: ', error);
          if (error?.response?.statusText === "Forbidden") return logout()
        })
    } else {
      axios.get(urlBase + `pantallas/${user?.proyecto}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        signal: controller.current.signal
      }).then(response => {
        if (controller.current) {

        }
      })
        .catch(error => {
          console.error('Request Error: ', error);
          if (error?.response?.statusText === "Forbidden") return logout()
        })
    }
  }

  const cancelCall = () => {
    controller.current.abort();
  }


  useEffect(() => {
    refreshPantallas();
    return () => {
      cancelCall()
      controller.current = new AbortController();
    }
  }, []);


  return { isAdmin, menu, titulos }

}

export default useGetPantallas;