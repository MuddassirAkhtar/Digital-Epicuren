
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReelCard from "../components/ReelCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";


/* ─── Main Reels Page ─────────────────────────────────────────────────────── */
const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { reelId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const handleReelChange = (direction) => {
    if (!reels.length) return;
    
    const currentIndex = reels.findIndex(r => r._id === reelId);
    let nextIndex;
    
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % reels.length;
    } else if (direction === 'prev') {
      nextIndex = currentIndex === 0 ? reels.length - 1 : currentIndex - 1;
    } else {
      return;
    }
    
    navigate(`/reel/${reels[nextIndex]._id}`, { replace: true });
  };

  // Scroll to the reel when reelId changes
  useEffect(() => {
    if (!reelId || !reels.length || !scrollContainerRef.current) return;
    
    const currentIndex = reels.findIndex(r => r._id === reelId);
    if (currentIndex === -1) return;
    
    setTimeout(() => {
      const scrollTop = currentIndex * window.innerHeight;
      scrollContainerRef.current?.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }, 0);
  }, [reelId, reels]);

  useEffect(() => {
    /* Load Bebas Neue for that bold short-form caption vibe */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap";
    document.head.appendChild(link);

    async function fetchReels() {
      try {
        const response = await axios.get("https://digital-epicuren.onrender.com/api/food/reels");
        setReels(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReels();
  }, []);



 

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-3">
        <div
          className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "#FF6B35 transparent transparent transparent" }}
        />
        <p className="text-gray-400 text-sm">Loading Reels…</p>
      </div>
    );
  }

  if (!reels.length) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <p className="text-gray-500 text-sm">No reels available right now.</p>
      </div>
    );
  }




   return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div
      ref={scrollContainerRef}
      className="h-screen w-full md:w-1/3 overflow-y-scroll snap-y snap-mandatory "
      style={{ scrollbarWidth: "none" }}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
      {reels.map((reel, i) => (
        <ReelCard key={reel._id} reel={reel} index={i} />
      ))}
    </div>

    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-20 text-gray-400">
    
    <div className="flex flex-col items-center gap-5 rounded-full p-2">

      <div className="rounded-full p-2  cursor-pointer" style={{ background: "rgba(255,255,255,0.1)" }}
       onClick={() => handleReelChange('prev')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      </div>

       <div className="rounded-full p-2  cursor-pointer" style={{ background: "rgba(255,255,255,0.1)" }} 
               onClick={() => handleReelChange('next')}
       >
        {/* Down Arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 rotate-270" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
       </div>
    </div>

    </div>
    </div>
  );
}
 


export default Reels;