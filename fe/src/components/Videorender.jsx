import React from 'react';
import ReactPlayer from 'react-player';
import animeVideo from '../assets/anime_video.mp4';

const Videorender = () => {
    return (
        <>



            <div className="w-full p-20 bg-gray-900 ">
                <div className='flex justify-between '>
                    <button className="text-4xl bg-white bg-gray-900 "> Back</button>

                    <div className=" text-4xl bg-white bg-gray-900">Video 1</div>
                </div>
                <ReactPlayer
                    url={animeVideo}  // Use url instead of src
                    controls
                    width="100%"
                    height="600px"

                />
            </div>
        </>
    );
};

export default Videorender;
