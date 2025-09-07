import React from "react";

interface Tag {
  _id: string;
  title: string;
}

interface CardProps {
  _id: string;
  title: string;
  link: string;
  thumbnailUrl?: string;
  tags?: Tag[];
  onDelete?: (_id: any) => void; // callback to trigger delete
}

const Card: React.FC<CardProps> = ({ _id, title, link, thumbnailUrl, tags, onDelete }) => {
  return (
    <div className="w-[15rem] h-[15rem] bg-blue-500 border-black border-2 m-4 rounded-lg flex flex-col overflow-hidden relative shadow-sm shadow-slate-400 transition-all duration-200 hover:shadow-md hover:shadow-black ">
      {/* Delete Button - nice position */}
      {onDelete && (
        <button
          onClick={() => onDelete(_id)}
          className="absolute top-2 right-2 bg-red-600 text-white text-lg w-6 h-6 rounded-lg font-bold flex items-center justify-center shadow-lg hover:bg-red-700 transition border-4 border-black"
          title="Delete content"
        >
          &#8722;
        </button>
      )}

      {/* Thumbnail Image */}
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-[60%] object-cover rounded-t-lg"
        />
      )}

      {/* Content Area */}
      <div className="p-2 flex flex-col gap-1 h-[40%]">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold text-[15px] leading-snug hover:underline break-words"
          title={title}
        >
          {title}
        </a>

        {/* Tags container */}
        <div className="mt-1 flex flex-wrap gap-1 max-h-10 overflow-y-auto">
          {tags?.map((tag) => (
            <span
              key={tag._id}
              className="bg-white text-gray-800 text-sm py-0.5 px-2 rounded-md border border-gray-900"
              title={tag.title}
            >
              {tag.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
