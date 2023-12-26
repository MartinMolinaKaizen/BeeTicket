import apiAxios from '../../../services/config';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../../context/user';

function useGetPantallas() {

  const { logout } = useContext(UserContext);
  const [pantallas, setPantallas] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [dataCreate, setDataCreate] = useState({});
  const [receptores, setReceptores] = useState([]);

  const controller = useRef(new AbortController());

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const transformarArray = (response) => {
    const resultado = {};

    response.forEach((item) => {
      const proyectoDesc = item.proyecto.proyecto_desc;

      if (!resultado[proyectoDesc]) {
        resultado[proyectoDesc] = {
          proyecto_desc: proyectoDesc,
          pantallas: [],
        };
      }

      resultado[proyectoDesc].pantallas.push({
        pantalla_id: item.pantalla_id,
        pantalla_desc: item.pantalla_desc,
      });
    });

    const resultadoArray = Object.values(resultado);

    return resultadoArray;
  }

  const refreshPantallas = () => {
    setIsAdmin(user?.proyecto === 'admin');

    if (user?.proyecto === 'admin') {
      apiAxios.get("receptores/all", {
        signal: controller.current.signal
      }).then(response => {
        if (controller.current) {
          setReceptores(response.data?.map(item => item.receptor));
        }
      }).catch(error => {
        console.error('Request Error: ', error);
        if (error?.response?.statusText === "Forbidden") return logout()
      })

      apiAxios.get("pantallas/all", {
        signal: controller.current.signal
      }).then(response => {
        if (controller.current) {
          setPantallas(transformarArray(response.data));
          setDataCreate({
            "empresa": null,
            "emisor": user.nombre + user.apellido,
            "descripcionEmisor": user.usuario
          });
        }
      })
        .catch(error => {
          console.error('Request Error: ', error);
          if (error?.response?.statusText === "Forbidden") return logout()
        })
    } else {
      apiAxios.get(`receptores/${user?.proyecto}`, {
        signal: controller.current.signal
      }).then(response => {
        if (controller.current) {
          setReceptores(response.data?.map(item => item.receptor));
        }
      }).catch(error => {
        console.error('Request Error: ', error);
        if (error?.response?.statusText === "Forbidden") return logout()
      })

      apiAxios.get(`pantallas/${user?.proyecto}`, {
        signal: controller.current.signal
      }).then(response => {
        if (controller.current) {
          setPantallas(response.data?.map(({ pantalla_id, pantalla_desc }) => ({ pantalla_id, pantalla_desc })))
          setDataCreate({
            "empresa": user?.proyecto,
            "emisor": user.nombre + user.apellido,
            "descripcionEmisor": user.usuario
          });
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


  return { isAdmin, pantallas, dataCreate, receptores }

}

export default useGetPantallas;