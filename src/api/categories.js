import axios from './axios.js'

export const getAllCategories = () => axios.get('/api/categories/getAll')
export const getCategoryById = (id) => axios.get(`/api/categories/getById/${id}`)
export const createCategory = (category) => axios.post('/api/categories/create', category) 
export const updateCategory = (id, category) => axios.put(`/api/Categories/update/${id}`, category)
export const deleteCategory = (id) => axios.delete(`/api/categories/delete/${id}`)