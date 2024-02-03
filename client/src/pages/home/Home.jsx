import Stories from '../../components/stories/Stories'
import Posts from '../../components/posts/Posts'
import './home.scss'

const Home = () => {
  return (
    <section className="home">
      <Stories />
      <Posts />
    </section>
  )
}
export default Home
