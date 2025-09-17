import { useState, useEffect } from "react";
import {getAllInstitutions, deleteInstitution, createInstitution} from "../api/institutions.js"

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // obtener todas las instituciones
  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      const res = await getAllInstitutions();
      setInstitutions(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const createInstitutions = async (name) => {
    try {
      const res = await createInstitution({ name });
      setInstitutions([...institutions, res.data]);
      return res.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteInstitutions = async (id) => {
   try {
    await deleteInstitution(id)
    setInstitutions(institutions.filter(inst => inst.id != id))
   } catch (error) {
    setError(error.message)
    throw err
   }
  }

  useEffect(() => {
   fetchInstitutions()
  }, [])

  return {
   institutions,
   loading,
   error,
   createInstitutions,
   deleteInstitutions,
   fetchInstitutions // por auto refresh
  }
};

