import axios from './axios.js'

export const getAllSituations = () => axios.get('/api/situations/getAll')
export const getSituationById = (id) => axios.get(`/api/situations/getById/${id}`)
export const createSituation = (situation) => axios.post('/api/situations/create', situation) 
export const updateSituation = (id, situation) => axios.put(`/api/situations/update/${id}`, situation)
export const deleteSituation = (id) => axios.delete(`/api/situations/delete/${id}`)
export const getCategoriesWithSituations = () => axios.get('/api/situations/getAllSituationsByCategory')