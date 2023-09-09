import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";

const Post = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // function for get fetch data
  const fetchData = async () => {
    try {
      const getData = await fetch(API_URL);
  
      if (!getData.ok) {
        throw new Error("Network response was not ok");
      }
  
      const jsonData = await getData.json();
      localStorage.setItem("myData", JSON.stringify(jsonData));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  // for kick start the function
  useEffect(() => {
    fetchData();
  }, []);

  // get data form local storage and set to main data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("myData"));
    setData(
      storedData.filter((storedData) =>
        storedData.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  
  // function for delete
  const handleDelete = (deleteId) => {
    const updatedData = data.filter((data) => data.id !== deleteId);
    setData(updatedData);
    localStorage.setItem("myData", JSON.stringify(updatedData));
  };

  // Handle page refresh to maintain search state
  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQuery");
    if (storedSearchQuery) {
      setSearch(storedSearchQuery);
    }
  }, []);
  
  //set local storage value of search
  useEffect(() => {
      localStorage.setItem("searchQuery", search);
    },
    [search]);
  
  // function for reload
  const handleReloadAll = () => {
    setSearch("")
  };

  return (
    <>  
      {/* search and reload */}
      <div className="outterNav">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
        />
        <button onClick={handleReloadAll}>Reload All</button>
      </div>
      
                 {/* display the post */}
      <Grid container spacing={2} className="outerPost">
        {data.map((post) => (
          <Grid className="innerpost" item xs={5} sm={5} md={3} key={post.id}>
            <Paper elevation={8} className="box">
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.body}</Typography>
            </Paper>
            <button type="submit" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Post;
