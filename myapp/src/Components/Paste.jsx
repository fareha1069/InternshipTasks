import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Eye, Clipboard } from "lucide-react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filterData = useMemo(() => {
    return pastes.filter((paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pastes, searchTerm]);

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to Clipboard");
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="p-3 w-full max-w-xl border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search paste..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pastes Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filterData.length > 0 ? (
          filterData.map((paste, index) => (
            <div
              key={paste.id || index}
              className="flex flex-col justify-between h-full p-5 bg-gray-900 rounded-xl shadow-lg border border-gray-700 hover:shadow-purple-500/20 transition"
            >
              {/* Top: Title + Actions */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-semibold text-white break-words">
                    {paste.title}
                  </h2>
                  <div className="flex gap-3 text-gray-400">
                    <button
                      title="Edit"
                      onClick={() => navigate(`/?pasteId=${paste?.id}`)}
                    >
                      <Pencil className="w-5 h-5 hover:text-blue-500" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(paste?.id)}
                    >
                      <Trash2 className="w-5 h-5 hover:text-red-500" />
                    </button>
                    <Link to={`/viewPaste/${paste?.id}`}>
                      <Eye className="w-5 h-5 hover:text-green-500" />
                    </Link>
                    <button
                      title="Copy"
                      onClick={() => handleCopy(paste?.content)}
                    >
                      <Clipboard className="w-5 h-5 hover:text-yellow-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-gray-400 line-clamp-4">
                  {paste.content}
                </p>
              </div>

              {/* Bottom: Date */}
              <p
                className="text-xs font-medium text-right mt-4"
                style={{ color: "#5E6FC2" }}
              >
                {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            No matching pastes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
