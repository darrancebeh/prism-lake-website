"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewTrackerProps {
  slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Only run this once on the client side (after mount)
    const trackView = async () => {
      try {
        const res = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error("Could not track view:", error);
      }
    };
    
    // Check if the current environment is the client browser (for safety)
    if (typeof window !== 'undefined') {
        trackView();
    }
    
  }, [slug]);

  if (views === null) {
    // Hide the metric until the count is received
    return <div className="h-6" />; 
  }

  // Use toLocaleString for professional number formatting (e.g., 1,234)
  const formattedViews = views.toLocaleString();

  return (
    <div className="flex justify-center items-center gap-3 mt-4 text-sm font-mono text-gray-500">
      <Eye size={16} className="text-[#1b17ff]" />
      <span>{formattedViews} views</span>
    </div>
  );
}