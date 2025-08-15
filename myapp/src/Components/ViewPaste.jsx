import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const paste = useSelector((state) =>
    state.paste.pastes.find((p) => p.id === id)
  );

  if (!paste) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white max-w-sm w-full text-center">
          <p className="text-lg font-semibold mb-4">Paste not found</p>
          <Link
            to="/"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700 transition-transform transform hover:scale-[1.01]">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 break-words">
          {paste.title}
            <p
                className="text-xs font-medium text-right mt-4"
                style={{ color: "#5E6FC2" }}
              >
                {new Date(paste.createdAt).toLocaleString()}
              </p>
        </h1>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 max-h-[60vh] overflow-y-auto">
          <pre className="text-gray-300 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
            {paste.content}
          </pre>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
