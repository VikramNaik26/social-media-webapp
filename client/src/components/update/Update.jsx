import './update.scss'
import { useRef, useState } from 'react'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null)
  const [profile, setProfile] = useState(null)
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  })

  const upload = async (file) => {
    // console.log(file)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await makeRequest.post('/upload', formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put('/users', user)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault()
    let coverUrl
    let profileUrl
    coverUrl = cover ? await upload(cover) : user.coverPic
    profileUrl = profile ? await upload(profile) : user.profilePic

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl })
    setOpenUpdate(false)
  }

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const coverRef = useRef()
  const profileRef = useRef()

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={`/upload/${user.coverPic}`} alt="" />
                <CloudUploadIcon
                  className="icon"
                  type="button"
                  onClick={() => coverRef.current.click()}
                />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              accept="image/*"
              style={{ display: 'none' }}
              ref={coverRef}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={`/upload/${user.profilePic}`} alt="" />
                <CloudUploadIcon
                  className="icon"
                  type="button"
                  onClick={() => profileRef.current.click()}
                />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              accept="image/*"
              style={{ display: 'none' }}
              ref={profileRef}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}
export default Update
