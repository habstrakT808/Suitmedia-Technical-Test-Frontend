import React, { useState, useEffect } from "react";
import { fetchIdeas } from "../../services/api";
import PostCard from "./PostCard";
import Pagination from "../Pagination/Pagination";
import { SORT_OPTIONS, PAGE_SIZE_OPTIONS } from "../../utils/constants";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("-published_at");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page")) || 1;
    const size = parseInt(urlParams.get("size")) || 10;
    const sort = urlParams.get("sort") || "-published_at";

    setCurrentPage(page);
    setPageSize(size);
    setSortBy(sort);

    // Direct fetch test to examine the API response structure
    const testDirectFetch = async () => {
      try {
        const response = await fetch(
          "https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=1&append[]=small_image&append[]=medium_image&sort=-published_at",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Direct fetch test response:", data);

        if (data.data && data.data.length > 0) {
          const firstItem = data.data[0];
          console.log("Direct fetch - First item:", firstItem);
          console.log(
            "Direct fetch - First item small_image:",
            firstItem.small_image
          );
          console.log(
            "Direct fetch - First item medium_image:",
            firstItem.medium_image
          );
        }
      } catch (error) {
        console.error("Direct fetch test error:", error);
      }
    };

    testDirectFetch();
  }, []);

  const updateURL = (page, size, sort) => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("size", size);
    params.set("sort", sort);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        "page[number]": currentPage,
        "page[size]": pageSize,
        "append[]": ["small_image", "medium_image"],
        sort: sortBy,
      };

      const response = await fetchIdeas(params);

      if (response && response.data) {
        console.log("Posts received:", response.data.length);
        setPosts(response.data || []);
        setTotalItems(response.meta?.total || 0);
        setTotalPages(response.meta?.last_page || 0);
      } else {
        console.error("Invalid response format:", response);
        setError("Failed to fetch posts. Invalid response format.");
      }

      updateURL(currentPage, pageSize, sortBy);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, pageSize, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getItemsStatus = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return `${start} - ${end} of ${totalItems}`;
  };

  if (loading) {
    return (
      <div className="post-list">
        <div className="post-list__container">
          <div className="post-list__loading">
            <div className="post-list__spinner"></div>
            <p>Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list">
        <div className="post-list__container">
          <div className="post-list__error">
            <p>{error}</p>
            <button onClick={fetchPosts} className="post-list__retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list__container">
        <div className="post-list__controls">
          <div className="post-list__status">Showing {getItemsStatus()}</div>

          <div className="post-list__filters">
            <div className="post-list__filter-group">
              <label htmlFor="pageSize">Show per page:</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="post-list__select"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="post-list__filter-group">
              <label htmlFor="sortBy">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="post-list__select"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="post-list__empty">
            <p>No posts found.</p>
          </div>
        ) : (
          <>
            <div className="post-list__grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostList;
