import Stories from '../../components/stories/Stories'
import Posts from '../../components/posts/Posts'
import Share from '../../components/share/Share'
import './home.scss'

const Home = () => {
  return (
    <section className="home">
      <Stories />
      <Share />
      <Posts />
    </section>
  )
}
export default Home
