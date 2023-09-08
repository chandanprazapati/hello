import { useLayoutEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    function updateScrollPosition() {
      setScrollPosition(window.pageYOffset);
    }
    // Add an event listener to update the scroll position on scroll
    window.addEventListener("scroll", updateScrollPosition);

    // Call the update function initially to get the initial scroll position
    updateScrollPosition();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className="flex flex-row justify-center items-center rounded-full text-white bg-blue-100 h-12 w-12 "
    >
      <FaArrowCircleUp size={30} />
    </button>
  );
};

export default BackToTop;
