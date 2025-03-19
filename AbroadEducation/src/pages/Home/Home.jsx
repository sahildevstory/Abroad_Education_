import BannerVideo from '../../components/BannerVideo/BannerVideo';
import YoutubePost from '../../components/YoutubePost/YoutubePost';
import LinkedIn from '../../components/LinkedIn/LinkedIn';
import Instagram from '../../components/Instagram/Instagram';
import BlogPost from '../../components/BlogPost/BlogPost';

const Home = () => {
  return (
    <>
      <BannerVideo />
      <YoutubePost channelId="UCoLBJTjI-fYkOhuJsejTeSA"/>
      <LinkedIn />
      <Instagram />
      <BlogPost />
    </>
  );
};

export default Home;
