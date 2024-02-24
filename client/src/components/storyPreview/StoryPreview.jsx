import { useEffect } from 'react'
import './storyPreview.scss'

const StoryPreview = ({ openStory, setOpenStory, data }) => {
  const story = data.filter((story) => story.id === openStory.id)
  // console.log(openStory)
  // console.log(story)

  useEffect(() => {
    setTimeout(() => {
      setOpenStory({ id: story[0].id, open: false })
    }, 5000)
  }, [])

  return (
    <section className="preview">
      {story ? (
        <div className="wrapper">
          <h3>{story[0].name}</h3>
          <img src={`/upload/${story[0].img}`} alt="story" />
          <button
            type="button"
            className="close"
            onClick={() => setOpenStory({ id: story[0].id, open: false })}
          >
            x
          </button>
        </div>
      ) : null}
    </section>
  )
}
export default StoryPreview
