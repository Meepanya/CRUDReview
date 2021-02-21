import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";

function App() {
  const [moviewName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState<[]>([]);
  const [newReview, setNewReview] = useState<string>("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
    .then((response) => {
      setMovieList(response.data);
    })
  }, [])

  const submitReview = () => {
    console.log("Inserted.")
    Axios.post("http://localhost:3001/api/insert", {
      moviewName: moviewName, 
      movieReview: review
    });

    setMovieList([
      ...movieReviewList,
    ]);
  };

  const updateReview = (movie:string) => {
    Axios.put("http://localhost:3001/api/update/", {
      moviewName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  }

  const deleteReview = (movie:string) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  return (
    <>
      <div className="App">
      <h1>CRUD app</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val:any) => {
          return (
            <div className="card">
              <h2>{val.moviewName}</h2>
              <p>{val.movieReview}</p>

              <button onClick={() => deleteReview(val.moviewName)}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              }}/>
              <button onClick={() => {updateReview(val.moviewName)}}>Update</button>
            </div>
          )
        })}
      </div>
    </div>
    </>
  );
}

export default App;
