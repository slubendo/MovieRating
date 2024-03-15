import { useEffect, useState } from "react";
import "./App.css";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  createdAt: string;
};

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [year, setYear] = useState(0);
  const [post, setPost] = useState(false);

  useEffect(() => {
    async function fetchmovies() {
      const response = await fetch("/api/Movies");
      const data = await response.json();
      setMovies(data);
    }
    fetchmovies();
  }, [post]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPost(true)
    const response = await fetch("/api/Movies");
    const data = await response.json();
    console.log(data.length)

    const result = await fetch("/api/Movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data.length + 1, title: title, rating: rating, year: year }),
    })

    const databody = result.json()
    console.log(databody)
    setPost(false)
  }

  return (
    <>
      <h1>Hello from react and dotnet</h1>
      <h2>Here's my list of Movies</h2>
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>movie rating is {movie.rating}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
        <input type="number" name="rating" placeholder="rating" onChange={(e) => setRating(parseInt(e.target.value))} />
        <input type="number" name="year" placeholder="year" onChange={(e) => setYear(parseInt(e.target.value))} />
        <button type="submit">Add Movie</button>
      </form>
    </>
  );

}


