import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TbExternalLink } from "react-icons/tb";


const YoutubePost = ({ channelId }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Fetch the channel's upload playlist ID
                const channelResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=AIzaSyCG-sRcvMzeYiUG96yLuetUlGYwg-x-1jk`
                );
                const uploadPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

                // Fetch videos from the upload playlist
                const playlistResponse = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${uploadPlaylistId}&key=AIzaSyCG-sRcvMzeYiUG96yLuetUlGYwg-x-1jk`
                );
                setVideos(playlistResponse.data.items);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };


        if (channelId) {
            fetchVideos();
        }
    }, [channelId]);

    if (loading) {
        return <div>Loading...</div>;
    }

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
        <div className="relative mt-10 " >
                <div  className=' text-white text-center text-3xl flex justify-between p-4 items-center'>
                    <h2 className='flip-up cursor-pointer'>Youtube Videos</h2>
                    <a href="https://www.youtube.com/@abroad_educations"><TbExternalLink size={30} /></a>
                
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
                {videos.map((video) => (
                    <div key={video.id} className="flex flex-col items-center ml-2 mr-2 mb-4">
                        <a
                            href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <img
                                src={video.snippet.thumbnails.medium.url}
                                alt={video.snippet.title}
                                className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl"
                            />
                            <h3 className="mt-2 text-center text-white text-sm font-semibold">
                                {video.snippet.title}
                            </h3>
                        </a>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default YoutubePost;
