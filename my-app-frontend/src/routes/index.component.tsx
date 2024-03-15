import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../App.css";
import { fetchmovies } from "../network";

type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
    createdAt: string;
};

export const component = function Home() {

    // const [movies, setMovies] = useState<Movie[]>([]);

    // useEffect(() => {
    //     async function fetchmovies() {
    //         const response = await fetch("/api/Movies");
    //         const data = await response.json();
    //         setMovies(data);
    //     }
    //     fetchmovies();
    // }, []);

    const { isPending, error, data } = useQuery({ queryKey: ['movies'], queryFn: fetchmovies })

    return (
        <>
            <div className="m-4">
                <h1 className="text-4xl mb-10">Here is a list of my movies</h1>
                {isPending ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: try again later</p>
                ) : (
                    data.map((movie: Movie) => (
                        <div key={movie.id}>
                            <h2 className="text-2xl">{movie.title}</h2>
                            <p>Rating: {movie.rating}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    );

}


