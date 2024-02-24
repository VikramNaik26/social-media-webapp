import { useContext, useState } from 'react'
import './stories.scss'

import { AuthContext } from '../../context/authContext'
import StoryUpload from '../storyUpload/StoryUpload.jsx'

import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios.js'
import StoryPreview from '../storyPreview/StoryPreview.jsx'

const Stories = () => {
  const { currentUser } = useContext(AuthContext)
  // console.log(currentUser)

  const queryKey = ['stories']
  const fetchPosts = async () => {
    const response = await makeRequest.get('/stories?userId=' + currentUser.id)
    return response.data
  }

  // Use the useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchPosts(),
  })

  // console.log(data)
  //TEMPORARY
  /*  const stories = [
    {
      id: 1,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 2,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 3,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 4,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 5,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 6,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 7,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
  ] */

  const [openUpdate, setOpenUpdate] = useState(false)
  const [openStory, setOpenStory] = useState({ id: null, open: false })

  return (
    <section className="stories">
      <div className="story">
        <img
          src={
            currentUser.profilePic
              ? `/upload/${currentUser.profilePic}`
              : 'https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc'
          }
          alt={currentUser.name}
        />
        <span>{currentUser.name}</span>
        <button type="button" onClick={() => setOpenUpdate(true)}>
          +
        </button>
      </div>
      {data &&
        data.map((story) => (
          <div key={story.id} className="story">
            <img
              src={`/upload/${story.img}`}
              alt={story.name}
              onClick={() => setOpenStory({ id: story.id, open: true })}
            />
            <span>{story.name}</span>
            {openStory.open ? (
              <StoryPreview openStory={openStory} setOpenStory={setOpenStory} data={data} />
            ) : null}
          </div>
        ))}

      {openUpdate && !openStory.open ? (
        <StoryUpload
          openStory={openStory}
          setOpenUpdate={setOpenUpdate}
          story={data}
        />
      ) : null}
    </section>
  )
}
export default Stories
