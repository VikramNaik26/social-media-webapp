import { useContext } from 'react'
import './stories.scss'

import { AuthContext } from '../../context/authContext'

const Stories = () => {
  const { currentUser } = useContext(AuthContext)
  //TEMPORARY
  const stories = [
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
  ]
  return (
    <section className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt={currentUser.name} />
        <span>vikram</span>
        <button>+</button>
      </div>

      {stories.map((story) => (
        <div key={story.id} className="story">
          <img src={story.img} alt={story.name} />
          <span>{story.name}</span>
        </div>
      ))}
    </section>
  )
}
export default Stories
