import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import thumb1 from '../../assets/thumb1.jpg'
import thumb2 from '../../assets/thumb2.jpg'
import thumb3 from '../../assets/thumb3.jpg'
import thumb4 from '../../assets/thumb4.jpg'
import thumb5 from '../../assets/thumb5.jpg'
import thumb6 from '../../assets/thumb6.jpg'
import { TbExternalLink } from "react-icons/tb";

const Instagram = () => {
    const posts = [
        {
          id: 1,
          imageUrl: thumb1,
          title: 'Be the first to like this.....',
          link: 'https://www.instagram.com/reel/DFSz0K0PTsZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==D',
        },
        {
          id: 2,
          imageUrl: thumb2,
          title: `Don't Miss Out! Essential Documents for a Germany Visa`,
          link: 'https://www.instagram.com/reel/DFIgoTmPg-x/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        },
        {
            id: 3,
            imageUrl: thumb3,
            title: 'Top USA Colleges for international students',
            link: 'https://www.instagram.com/reel/DEZ1EtkPr3a/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
          },
          {
            id: 4,
            imageUrl: thumb4,
            title: '✨ Dreaming of new horizons? 🌎 Here are the Top 5 Reasons to Choose the USA for your next big step! 🇺🇸💼',
            link: 'https://www.instagram.com/reel/DEMwnP9RVjb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
          },
          {
            id: 5,
            imageUrl:thumb5,
            title: 'Study in France | Reasons why You Should Choose France!',
            link: 'https://www.instagram.com/reel/DDwpWHYPnd3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
          },
          {
            id: 6,
            imageUrl: thumb6,
            title: 'Fulda university is calling - Programs, Deadlines, How to apply?',
            link: '',
          },
        // Add more posts as needed
      ];
    
  // Define responsive settings
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className=" relative mt-10">
          <div  className=' text-white text-center text-3xl flex justify-between p-4 items-center'>
                            <h2 className='flip-up cursor-pointer'>Instagram Posts</h2>
                            <a href="https://www.instagram.com/abroad_educations_"><TbExternalLink size={30} /></a>
                        
                        </div>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="transform 0.5s ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col items-center mx-2 mb-4">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl text-white"
              />
              <h3 className="mt-2 text-center text-sm font-semibold text-white">
                {post.title}
              </h3>
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Instagram;
