import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const SharedBrainPage = () => {
  const { userId } = useParams();
  const [sharedData, setSharedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        const res = await fetch(`/api/v1/brain/share/${userId}`);
        if (!res.ok) throw new Error("Shared brain not found or sharing disabled");
        const data = await res.json();
        setSharedData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSharedBrain();
  }, [userId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!sharedData) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{sharedData.username}'s Shared Brain</h1>
      <div className="flex flex-wrap gap-6">
        {sharedData.content.length > 0 ? (
          sharedData.content.map((content) => (
            <Card
              key={content.id}
              _id={content.id}
              title={content.title}
              link={content.link}
              thumbnailUrl={content.thumbnailUrl}
              tags={content.tags.map((tag) => ({ title: tag }))} // Map strings to tag objects if needed
              onDelete={null} // No delete button on shared view
            />
          ))
        ) : (
          <p>No shared content available.</p>
        )}
      </div>
    </div>
  );
};

export default SharedBrainPage;
