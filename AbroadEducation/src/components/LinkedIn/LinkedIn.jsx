import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TbExternalLink } from "react-icons/tb";
import './LinkedIn.css';
const PostCarousel = () => {
    const posts = [
        {
          id: 1,
          imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQG6_xAIEe2YGw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1734511785796?e=1744243200&v=beta&t=yLxOFoM3-GUzMZrvnZ-nMPYJMwNpt7-6NSJha4d3vkk',
          title: 'Behind the Scenes: A Day in the Life of an Operations Maestro',
          link: 'https://www.linkedin.com/pulse/behind-scenes-day-life-operations-maestro-sohaib-khan-qnsmf/?trackingId=p%2B5reNZT4mPw%2BUHqoHoCIg%3D%3D',
        },
        {
          id: 2,
          imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQGoRrdq0XEq5Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1737988857405?e=1744243200&v=beta&t=DcYIUFsGl8_cFaNhAm-3ujU09skh8nf4scrT2zAfTDo',
          title: 'The First Interview Experience: Lessons From My Journey',
          link: 'https://www.linkedin.com/pulse/first-interview-experience-lessons-from-my-journey-sohaib-khan-7hsvf/?trackingId=ZPkoAhTvQanz0Nxa8E0k%2FQ%3D%3D',
        },
        {
            id: 3,
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQFuBVYiomVZPg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1737901132611?e=1744243200&v=beta&t=G7f2hYblhCUMSOwBBSf1P3erLS94ylzNKrp9qExmfdQ',
            title: 'From Small Startups to Unicorns: Understanding Business Structures for Success',
            link: 'https://www.linkedin.com/pulse/understanding-how-companies-operate-from-small-businesses-sohaib-khan-xl1ef/?trackingId=xNjKz4aTjTuhVU%2FqGxmduQ%3D%3D',
          },
          {
            id: 4,
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQGz5xsnWlqbbQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1737200239263?e=1744243200&v=beta&t=ZD5DuvYsu5vE3nSiEnNR467o375KtBPrqZt8sZ15KVg',
            title: 'Qualities vs. Quantity in Startups: Why Both Matter and How to Balance Them',
            link: 'https://www.linkedin.com/pulse/qualities-vs-quantity-startups-why-both-matter-how-balance-khan-livef/?trackingId=FqPfzz%2BVz%2BaeaGV6aPrEHA%3D%3D',
          },
          {
            id: 5,
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQHVsHLjA-uOWg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1736845300995?e=1744243200&v=beta&t=qCn_8VybtxCyW6yDDJu-4yRu9ktD2kU1TBlAUWCuFI8',
            title: 'The Challenges of Having Multiple Bosses in a Startup',
            link: 'https://www.linkedin.com/pulse/when-too-many-bosses-spoil-startup-soup-sohaib-khan-82qff/?trackingId=yU2aaU%2FmqGfKr8cE64lP%2Fg%3D%3D',
          },
          {
            id: 6,
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQHAGYs9d7Bb3Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1736527061102?e=1744243200&v=beta&t=anJsoLqKxWJgGmN3bi1PsX27mrXZP0YxfVKNlTjeXk0',
            title: 'Roadmap to Becoming a Successful Management Consultant',
            link: 'https://www.linkedin.com/pulse/roadmap-becoming-successful-management-consultant-sohaib-khan-6wddf/?trackingId=L4yPnP6QhyZMO8R1KxCH6A%3D%3D',
          },
          {
            id: 8,
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQHKLCgSCsI6KA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1735113492464?e=1744243200&v=beta&t=pN8yYE-wAN8cjhqm6fF6MgdXg_T5oE7LlO30EQTRs4M',
            title: 'How to Become a Business Analyst: A Quick Roadmap',
            link: 'https://www.linkedin.com/pulse/how-become-business-analyst-roadmap-aspiring-sohaib-khan-voaqf/?trackingId=xb4zd3Mxezt30kip3HNqDQ%3D%3D',
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
                            <h2 className='flip-up cursor-pointer'>LinkedIn Posts</h2>
                            <a href="https://www.linkedin.com/in/sohaib-khan-9259a7280"><TbExternalLink size={30} /></a>
                        
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

export default PostCarousel;
