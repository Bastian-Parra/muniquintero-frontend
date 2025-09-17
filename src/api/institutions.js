import axios from './axios.js'

export const createInstitution = (institution) => axios.post('/api/institutions/create', institution)
export const deleteInstitution = (id) => axios.delete(`/api/institutions/delete/${id}`)
export const getAllInstitutions = () => axios.get('/api/institutions/getAll')
