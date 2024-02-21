import './storyUpload.scss'
import { useRef, useState } from 'react'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const StoryUpload = ({ setOpenUpdate, story }) => {
  const [storyImage, setStoryImage] = useState(null)

  const upload = async (file) => {
    console.log(file)
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
    mutationFn: (story) => {
      return makeRequest.post('/stories', story)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['stories'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault()
    let storyUrl = storyImage && (await upload(storyImage))

    mutation.mutate({ img: storyUrl })
    setOpenUpdate(false)
  }

  const storyRef = useRef()

  return (
    <div className="upload">
      <div className="wrapper">
        <h1>Upload your story</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Story Picture</span>
              <div className="imgContainer">
                {/* <img src={`/upload/${story.img}`} alt="" /> */}
                <CloudUploadIcon
                  className="icon"
                  type="button"
                  onClick={() => storyRef.current.click()}
                />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              accept="image/*"
              style={{ display: 'none' }}
              ref={storyRef}
              onChange={(e) => setStoryImage(e.target.files[0])}
            />
          </div>

          <button onClick={handleClick}>Upload</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  )
}
export default StoryUpload
