import axios from 'axios';
import apiAxios from '../../../services/config';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/user';
import { MessageManager } from '../../../context';

function useDeleteIncidente() {

  const [loadingDelete, setLoading] = useState(false);
  const { getToken, logout } = useContext(UserContext);
  const { handleSnackbar } = useContext(MessageManager);


  const deleteIncident = async (id, refresh) => {
    try {
      setLoading(true);

      const response = await apiAxios.delete("incidente/" + id);

      if (response.status === 200) {
        handleSnackbar("Incidente borrado", "success");
        refresh();
      }

    } catch (error) {
      console.error('Request Error: ', error);

      if (error?.response?.statusText === "Forbidden") {
        logout();
        return;
      }

      handleSnackbar("Error, intente más tarde", "error");
    } finally {
      setLoading(false);
    }
  };


  return [deleteIncident, loadingDelete]

}

export default useDeleteIncidente;