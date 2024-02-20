import './share.scss'
import Image from '../../assets/icons/img.png'
import Map from '../../assets/icons/map.png'
import Friend from '../../assets/icons/friend.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Share = () => {
  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState('')

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await makeRequest.post('/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const { currentUser } = useContext(AuthContext)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post('/posts', newPost)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault()
    let imageUrl = ''
    if (file) imageUrl = await upload()
    mutation.mutate({ desc, img: imageUrl })
    setDesc('')
    setFile(null)
  }

  // console.log(currentUser)

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                currentUser.profilePic
                  ? '/upload/' + currentUser.profilePic
                  : 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'
              }
              alt="profile"
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file ? (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            ) : null}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
