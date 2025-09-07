import React, { useState, useEffect } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [shareEnabled, setShareEnabled] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // On modal open, fetch current share state (optional: depends if you track locally)
  useEffect(() => {
    // Optionally fetch user share state and link here
    // For now we assume default false
    if (!isOpen) {
      // Clear modal state on close
      setShareLink(null);
      setShareEnabled(false);
    }
  }, [isOpen]);

  const toggleShare = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Unauthorized");

      const res = await fetch("/api/v1/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ share: !shareEnabled }),
      });
      if (!res.ok) throw new Error("Failed to update share");

      const data = await res.json();
      setShareEnabled(!shareEnabled);
      setShareLink(data.link);
    } catch (error) {
      alert("Error toggling share status");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="fixed z-50 top-1/2 left-1/2 w-96 bg-white rounded-lg shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Share Your Brain</h2>

        <label className="flex items-center mb-4 cursor-pointer select-none">
          <input
            type="checkbox"
            className="mr-2 w-5 h-5 cursor-pointer"
            checked={shareEnabled}
            onChange={toggleShare}
            disabled={loading}
          />
          <span>{shareEnabled ? "Sharing Enabled" : "Sharing Disabled"}</span>
        </label>

        {shareEnabled && shareLink && (
          <div className="mt-4">
            <p className="font-semibold mb-1">Share Link:</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                className="flex-grow p-2 border rounded bg-gray-100 break-all"
                value={shareLink}
                onFocus={(e) => e.target.select()}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert("Copied to clipboard!");
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShareModal;
