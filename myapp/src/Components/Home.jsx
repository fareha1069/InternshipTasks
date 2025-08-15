import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p.id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title.trim(),
      content: value.trim(),
      id: pasteId || Date.now().toString(36),
      createdAt: new Date().toString(),
    };

    if (!title.trim() || !value.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams('');
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Title Input */}
      <input
        type="text"
        className="w-full p-3 border border-gray-700 rounded-xl mt-5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter Title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Textarea */}
      <textarea
        className="w-full border border-gray-700 rounded-xl mt-4 min-h-[300px] p-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
        value={value}
        placeholder="Enter content here..."
        onChange={(e) => setValue(e.target.value)}
      ></textarea>

      {/* Create / Update Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={createPaste}
          className="px-6 py-3 bg-[#5E6FC2] hover:bg-[#3C4B99] text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          {pasteId ? 'Update Paste' : 'Create Paste'}
        </button>
      </div>
    </div>
  );
};

export default Home;
