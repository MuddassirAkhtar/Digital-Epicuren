import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useCart } from "../context/CartContext";

/* ─── Intersection-aware video reel ──────────────────────────────────────── */
const ReelCard = ({ reel, index }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(reel.likeCounts ?? 0);

  const user = React.useContext(AuthContext).user;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Initialize liked state based on user's previous likes
//   useEffect(() => {
//     if (user && reel.likes && reel.likes.length > 0) {
//       const isLiked = reel.likes.includes(user._id);
//       setLiked(isLiked);
//     } else {
//       setLiked(false);
//     }
//     setLikeCount(reel.likeCounts ?? 0);
//   }, [reel._id, user]);

  /* ── Intersection Observer: play/pause + unmute/mute ── */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.6;
        setIsVisible(visible);
        const vid = videoRef.current;
        if (!vid) return;
        if (visible) {
          vid.muted = muted;
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.muted = true;
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [muted]);

  /* ── Keep video muted state in sync ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isVisible) return;
    vid.muted = muted;
  }, [muted, isVisible]);

//   const handleLike = async () => {
//     if (!user) {
//       alert("Please login to like reels");
//       return;
//     }

//     try {
//       // Optimistic update
//       const newLiked = !liked;
//       setLiked(newLiked);
//       setLikeCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1));

//       // API call
//       const response = await axios.post("https://digital-epicuren.onrender.com/api/food/likes", {
//         foodId: reel._id,
//         userId: user._id,
//       });

//       // If successful, no need to do anything as state is already updated
//       console.log("Like updated:", response.data);
//     } catch (err) {
//       console.error("Error updating like count:", err);
//       // Rollback on error
//       setLiked((prev) => !prev);
//       setLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
//     }
//   };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: reel.reelName,
        text: reel.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleOrderNow = async () => {
    if (!user) {
      alert("Please login to order");
      return;
    }

    try {
      // Fetch the food item details
      const response = await axios.get(
        `https://digital-epicuren.onrender.com/api/food/fooditem/${reel.foodItemId}`
      );

      const itemData = response.data.data;
      const partnerName = reel.foodPartener?.restaurantName || reel.foodPartener?.name || "Unknown Partner";

      // Add to cart
      addToCart({
        id: `${reel.foodPartener._id}-${itemData._id}`,
        title: itemData.name,
        price: itemData.price,
        partnerName: partnerName,
        currency: itemData.currency,
      });

      // Add to backend cart
      await axios.post(
        "https://digital-epicuren.onrender.com/api/cart/add",
        {
          foodItemId: itemData._id,
          quantity: 1,
          partnerName: partnerName,
        },
        {
          withCredentials: true,
        }
      );

      // Navigate to cart
      navigate(`/cart`);
    } catch (err) {
      console.error("Error ordering:", err);
      alert("Error adding item to cart");
    }
  };

  const fmtCount = (n) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n;
  };

  const partner = reel.foodPartener ?? {};

  return (
    <div
      ref={cardRef}
      className="relative h-screen w-full snap-start flex-shrink-0 overflow-hidden bg-black"
    >
      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        src={reel.video}
        loop
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ── GRADIENT OVERLAYS ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 pointer-events-none" />

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-6 pb-2 z-20">
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.12em",
            fontSize: "1.1rem",
            color: "#FF6B35",
          }}
        >
          FOOD REELS
        </span>

        {/* Mute toggle */}
        <button
          onClick={() => setMuted((p) => !p)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          {muted ? (
            /* muted icon */
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            /* unmuted icon */
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── RIGHT ACTIONS (Like, Share) ── */}
      <div className="absolute right-4 bottom-10 flex flex-col items-center gap-4 z-20">
        {/* Like Button */}
        {/* <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: liked ? "rgba(255,59,48,0.25)" : "rgba(255,255,255,0.15)",
              border: liked ? "1.5px solid #FF3B30" : "1.5px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              transform: liked ? "scale(1.15)" : "scale(1)",
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill={liked ? "#FF3B30" : "white"}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-white text-xs font-semibold" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
            {fmtCount(likeCount)}
          </span>
        </button> */}

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
          </div>
          <span className="text-white text-xs font-semibold" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
            Share
          </span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-16 px-4 pb-6 z-20">
        {/* Restaurant name */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: "1.5px solid #FF6B35" }}
          >
            {partner.logo ? (
              <img src={partner.logo} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "#FF6B35" }}>
                <span className="text-white text-xs font-black">{(partner.restaurantName ?? "R")[0]}</span>
              </div>
            )}
          </div>
          <span
            className="text-white text-sm font-semibold"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
          >
            {partner.restaurantName ?? "Restaurant"}
          </span>
        </div>

        {/* Caption / reel name */}
        <p
          className="text-white font-extrabold text-lg leading-tight mb-1"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.04em",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          {reel.reelName}
        </p>

        {/* Description — expandable */}
        <div className="mb-3">
          <p
            className="text-gray-300 text-sm leading-snug"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: showDesc ? "unset" : 2,
              WebkitBoxOrient: "vertical",
              overflow: showDesc ? "visible" : "hidden",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {reel.description}
          </p>
          {reel.description?.length > 80 && (
            <button
              onClick={() => setShowDesc((p) => !p)}
              className="text-xs mt-0.5"
              style={{ color: "#FF6B35" }}
            >
              {showDesc ? "less" : "more"}
            </button>
          )}
        </div>

        {/* Order Now Button */}
        <button
          onClick={handleOrderNow}
          className="flex items-center gap-2 px-2 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 w-full justify-center"
          style={{
            background: "linear-gradient(135deg, #FF6B35, #FF3B30)",
            color: "white",
            boxShadow: "0 4px 20px rgba(255,107,53,0.5)",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.1em",
            fontSize: "0.95rem",
          }}
        >
          <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 5.9 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default ReelCard;
