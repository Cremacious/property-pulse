'use client';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-center font-bold text-2xl">Share This Property</h3>
      <div className="pb-5 flex gap-3 justify-center">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, '')} For Rent`}
        >
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Share on Facebook
          </button>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <button className="bg-blue-400 text-white px-4 py-2 rounded">
            Share on Twitter
          </button>
        </TwitterShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
