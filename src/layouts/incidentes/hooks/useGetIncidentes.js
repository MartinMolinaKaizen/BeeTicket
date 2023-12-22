import axios from 'axios';
import { urlBase } from '../../../services/config';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../../context/user';

function useGetIncidentes(adapterInc, page) {

  const [loading, setLoading] = useState(true);
  const [datosVacios, setDatosVacios] = useState(true);
  const [noEncontrado, setNoEncontrado] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const [cantidadPaginas, setCantidadPaginas] = useState(1);
  const { getToken, logout } = useContext(UserContext);

  const controller = useRef(new AbortController());

  const refresh = (search = "") => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    setIsAdmin(user?.proyecto === 'admin');

    let promesa = null;
    if (user?.proyecto === 'admin') {
      if (search) {
        promesa = axios.get(urlBase + "searchIncidentes/" + search + "?page=" + page, {
          headers: { Authorization: `Bearer ${getToken()}` },
          signal: controller.current.signal
        })
      } else {
        promesa = axios.get(urlBase + "incidentes" + "?page=" + page, {
          headers: { Authorization: `Bearer ${getToken()}` },
          signal: controller.current.signal
        })
      }
    } else {
      if (search) {
        promesa = axios.get(urlBase + `searchIncidentes/${user?.proyecto}/${search}` + "?page=" + page, {
          headers: { Authorization: `Bearer ${getToken()}` },
          signal: controller.current.signal
        })
      } else {
        promesa = axios.get(urlBase + `incidentes/${user?.proyecto}` + "?page=" + page, {
          headers: { Authorization: `Bearer ${getToken()}` },
          signal: controller.current.signal
        })
      }
    }

    promesa
      .then(response => {
        if (controller.current) {
          if (response?.data?.resultado?.length > 0) {
            adapterInc(response.data.resultado)
            setDatosVacios(false);
            setNoEncontrado(false);
            setCantidadPaginas(response.data.totalPages)
          } else {
            adapterInc([])
            if (search) {
              setNoEncontrado(true);
              setDatosVacios(false);
              setCantidadPaginas(1);
            } else {
              setDatosVacios(true);
              setNoEncontrado(false);
              setCantidadPaginas(1);
            }
          }
        }
      })
      .catch(error => {
        console.error('Request Error: ', error);
        if (error?.response?.statusText === "Forbidden") {
          logout();
        }
      })
      .finally(() => {
        if (controller.current) {
          setLoading(false);
        }
      });
  }

  const getIncByProyect = (proyect) => {
    axios.get(urlBase + `incidentes/${proyect}` + "?page=" + page, {
      headers: { Authorization: `Bearer ${getToken()}` },
      signal: controller.current.signal
    })
      .then(response => {
        if (controller.current) {
          if (response?.data?.resultado?.length > 0) {
            adapterInc(response.data.resultado)
            setDatosVacios(false);
            setNoEncontrado(false);
            setCantidadPaginas(response.data.totalPages)
          } else {
            adapterInc([])
            if (search) {
              setNoEncontrado(true);
              setDatosVacios(false);
              setCantidadPaginas(1);
            } else {
              setDatosVacios(true);
              setNoEncontrado(false);
              setCantidadPaginas(1);
            }
          }
        }
      })
      .catch(error => {
        console.error('Request Error: ', error);
        if (error?.response?.statusText === "Forbidden") {
          logout();
        }
      })
  }


  const cancelCall = () => {
    setLoading(false);
    controller.current.abort();
  }

  useEffect(() => {
    refresh();
    return () => {
      cancelCall()
      controller.current = new AbortController();
    }
  }, []);

  return { loading, datosVacios, refresh, isAdmin, noEncontrado, getIncByProyect, cantidadPaginas }

}

export default useGetIncidentes;