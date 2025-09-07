import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import PlusIcon from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import AddContentModal from "../components/AddContentModal";
import ShareModal from "../components/ShareModal";

function MainPage() {
  const navigate = useNavigate();

  // States
  const [tags, setTags] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // State for content, pagination, and loading
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingContent, setLoadingContent] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  // Fetch tags from backend
  const fetchTags = async (token: string) => {
    try {
      const res = await fetch("/api/v1/tags", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tags");
      const data = await res.json();
      setTags(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Auth and initial fetch
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setAccessDenied(true);
      setCheckingAuth(false);
      navigate("/");
      return;
    }

    setAccessDenied(false);
    setCheckingAuth(false);
    fetchTags(token);
  }, [navigate]);

  // Fetch paginated content when page changes
  useEffect(() => {
    fetchContent(page);
  }, [page]);

  // Handle tag click -> fetch filtered content by tag
  const handleTagClick = async (tagId: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;
      const res = await fetch(`/api/v1/content/tag/${tagId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch content");
      const data = await res.json();
      setFilteredContent(data.contents || []); // Use contents array explicitly
      setSelectedTag(tagId);
    } catch (error) {
      console.error("Error fetching filtered content:", error);
    }
  };

  // Clear filter handler
  const clearFilter = () => {
    setFilteredContent([]);
    setSelectedTag(null);
    fetchContent(1);
    setPage(1);
  };

  // Fetch paginated content function
  const fetchContent = async (requestedPage = 1) => {
    setLoadingContent(true);
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`/api/v1/content?page=${requestedPage}&limit=8`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch content");
      const data = await res.json();

      setContents(data.results);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      setContents([]);
      setTotalPages(1);
    } finally {
      setLoadingContent(false);
    }
  };

  // Delete content function
  const deleteContent = async (contentId: string) => {
    try {
      console.log("Deleting contentId:", contentId);

      const token = localStorage.getItem("jwtToken");
      const res = await fetch("/api/v1/content", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contentId }),
      });
      console.log(contentId);
      if (!res.ok) throw new Error("Delete failed");

      // Update states to remove deleted item
      setContents((prevContents) =>
        prevContents.filter((c) => c._id !== contentId)
      );
      setFilteredContent((prevFiltered) =>
        prevFiltered.filter((c) => c._id !== contentId)
      );

      // Refetch tags to update sidebar
      await fetchTags(token);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleAddContent = () => {
    // Refresh contents and tags, set page as needed
    fetchContent(1);
    fetchTags(localStorage.getItem("jwtToken"));
    setPage(1);
  };

  // Derive unique tags from current contents to display
  const deriveTagsFromContent = () => {
    const tagMap = {};
    contents.forEach((content) => {
      content.tags.forEach((tag) => {
        tagMap[tag._id] = tag;
      });
    });
    return Object.values(tagMap);
  };

  const displayedTags = deriveTagsFromContent();

  //handle search
  const handleSearch = async (searchQuery: string) => {
    setLoadingContent(true);
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      const url = `/api/v1/search?q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      // 'results' is array of matched content objects from your backend
      setFilteredContent(data.results || []);
      setSelectedTag(null); // Clear tag filter if any
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingContent(false);
    }
  };

  const isFiltering = filteredContent.length > 0;

  //clearing search
  const onClearSearch = () => {
  setFilteredContent([]);  // Clear search filtering
  setSelectedTag(null);    // Clear tag filter if active
  fetchContent(1);         // Load first page full content
  setPage(1);
};



  // Modal open/close handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Render loading or access denied states before main
  if (checkingAuth) return null;
  if (accessDenied)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-center p-4">
        <h2 className="text-2xl font-extrabold mb-4">
          You can't access this page.
        </h2>
        <p>Redirecting you to the landing page...</p>
      </div>
    );

  return (
    <div
      className={`body_container flex w-full h-fullrelative bg-slate-300 ${
        isModalOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-90 transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <AddContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddContent}
      />

      {/* Left Sidebar */}
      <div className="left_body bg-slate-100 w-1/5 h-screen flex-col text-center">
        <div className="upperleft border-b-4 border-slate-300 sidebar h-[15%] flex justify-center items-center font-inherit text-2xl font-extrabold text-slate-800">
          Free Space
        </div>
        <div className="lowerleft sidebarComponents justify-center h-auto pt-16 pl-2 pr-2 pb-2 flex flex-wrap gap-3">
          <div className="flex items-center justify-evenly w-full px-2 mb-2">
            <h3 className="font-semibold text-lg">Tags</h3>
            {selectedTag && (
              <button
                onClick={clearFilter}
                className="text-md font-semibold text-blue-600 hover:underline cursor-pointer"
                title="Clear filter"
              >
                Clear
              </button>
            )}
          </div>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <div
                key={tag._id}
                onClick={() => handleTagClick(tag._id)}
                className={`bg-white border-2 border-black rounded-lg p-2 text-gray-800 font-semibold cursor-pointer hover:bg-gray-200 h-auto ${
                  tag._id === selectedTag ? "bg-blue-200 border-blue-600" : ""
                }`}
              >
                {tag.title}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tags available</p>
          )}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="right_body w-4/5 h-screen">
        <div className="upper_right h-[15%] w-full pr-8 flex items-center justify-end gap-4">
          <SearchBar onSearch={handleSearch} onClear={onClearSearch} />

          <Button
            type="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            onClick={openModal}
          />
          <Button type="secondary" text="Share" startIcon={<ShareIcon />} onClick={() => setIsShareModalOpen(true)}/>
          <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}/>
          
          <button
            onClick={handleLogout}
            className="text-white font-medium px-4 py-2 bg-red-600 rounded transition cursor-pointer hover:shadow-md hover:shadow-black"
          >
            Logout
          </button>
        </div>
        <div className="lower_right main_body h-[85%] pl-8 flex flex-col justify-between">
          <div className="cards_holder flex flex-wrap h-auto grow overflow-auto">
            {loadingContent ? (
              <div className="w-full text-center py-12 text-lg">Loading...</div>
            ) : isFiltering ? (
              filteredContent.length > 0 ? (
                filteredContent.map((content) => (
                  <Card
                    key={content._id}
                    _id={content._id}
                    title={content.title}
                    link={content.link}
                    thumbnailUrl={content.thumbnailUrl}
                    tags={content.tags}
                    onDelete={deleteContent}
                  />
                ))
              ) : (
                <div className="w-full text-center py-12 text-lg">
                  No content found.
                </div>
              )
            ) : contents.length > 0 ? (
              contents.map((content) => (
                <Card
                  key={content._id}
                  _id={content._id}
                  title={content.title}
                  link={content.link}
                  thumbnailUrl={content.thumbnailUrl}
                  tags={content.tags}
                  onDelete={deleteContent}
                />
              ))
            ) : (
              <div className="w-full text-center py-12 text-lg">
                No content found.
              </div>
            )}
          </div>
          <div className="page_changer_box h-[10%] flex justify-center items-center">
            <div className="page_changer flex justify-center items-center gap-4 w-fit h-5 text-md font-semibold ">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPage(idx + 1);
                  }}
                  className={`border-2 border-blue-800 w-8 flex justify-center items-center px-4 cursor-pointer bg-white ${
                    page === idx + 1 ? "bg-blue-200 font-bold" : ""
                  } hover:shadow-md hover:shadow-black`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
