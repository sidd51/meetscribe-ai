// All the backend calls live in one file

import axios from 'axios'

const API =axios.create({
  baseURL : import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

export const uploadMeeting = ( formData , onUploadProgress) =>{
  API.post('/meetings/upload', formData,{
    headers: { 'Content-type' : 'multipart/form-data'},
    onUploadProgress
  })
}

export const getMeetings =()=>{
  API.get('/meetings')
}

export const getMeetingById =(id)=>{
  API.get(`/meetings/${id}`)
}


