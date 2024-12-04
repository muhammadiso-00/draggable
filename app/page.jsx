"use client"; // Ensure it's a client-side component

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { useSpring, animated } from "@react-spring/web"; // Import react-spring

function Home() {
  const [pages, setPages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newPage = {
      id: Date.now().toString(), // Unique ID for each page
      title,
      desc,
      image: imageSrc,
    };
    setPages([...pages, newPage]);
    setTitle("");
    setDesc("");
    setImageSrc(null);
  };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = pages.findIndex((page) => page.id === active.id);
      const newIndex = pages.findIndex((page) => page.id === over.id);
      const updatedPages = arrayMove(pages, oldIndex, newIndex);
      setPages(updatedPages);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Your form to create pages */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="p-3 w-full max-w-xs border border-gray-300 rounded-lg"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter description"
          className="p-3 w-full max-w-xs border border-gray-300 rounded-lg"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full max-w-xs border border-gray-300 rounded-lg p-2"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Create Page
          </button>
        </div>
      </div>

      {/* Drag and Drop Context */}
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={pages.map((page) => page.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {pages.map((page) => (
              <Page key={page.id} page={page} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function Page({ page }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: page.id });

  // Use react-spring to add animation effects
  const [style, api] = useSpring(() => ({ opacity: 1, transform: 'scale(1)' }));

  const handleDragStart = () => {
    api.start({ opacity: 0.5, transform: 'scale(1.05)' }); // On drag start, animate the page
  };

  const handleDragEnd = () => {
    api.start({ opacity: 1, transform: 'scale(1)' }); // On drag end, reset the animation
  };

  return (
    <animated.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style} // Apply animation styles
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
    >
      <h2 className="text-xl font-semibold">{page.title}</h2>
      <p>{page.desc}</p>
      {page.image && <img src={page.image} alt="Uploaded" className="mt-4" />}
      <p>Page ID: {page.id}</p>
    </animated.div>
  );
}

export default Home;
