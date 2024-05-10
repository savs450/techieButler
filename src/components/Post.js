// Post.js
import React, { useState, useEffect, useCallback } from "react";
import "./Post.css";
import Details from "./Details";

function Post() {
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const url = "https://jsonplaceholder.typicode.com/posts";

  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  function pageHandler(selectedPage) {
    if (selectedPage >= 1 && selectedPage <= details.length / 10 && selectedPage !== page)
      setPage(selectedPage);
  }

  const memoizedCallback = useCallback((id) => {
    setSelectedItemId(id);
    setOpenModal(true);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <h1>Posts</h1>
      {details.length > 0 && (
        <div className="listContainer">
          {details.slice(page * 10 - 10, page * 10).map((item) => (
            <div className="content" key={item.id}>
              <ul className="list_items" onClick={() => memoizedCallback(item.id)}>
                <div>{item.id}.</div>&nbsp; &nbsp;
                <div>{item.title}</div>
              </ul>
            </div>
          ))}
        </div>
      )}
      {selectedItemId && (
        <Details
          itemId={selectedItemId}
          body={details.find((item) => item.id === selectedItemId)?.body}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
      {details.length > 0 && (
        <div className="pagination_section">
          <span className="leftArrow" onClick={() => pageHandler(page - 1)}>
            ◀
          </span>
          {[...Array(details.length / 10)].map((_, i) => (
            <span className={page === i + 1 ? "numbers" : "pagination_Number"} key={i} onClick={() => pageHandler(i + 1)}>
              {i + 1}
            </span>
          ))}
          <span className="rightArrow" onClick={() => pageHandler(page + 1)}>
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default Post;
