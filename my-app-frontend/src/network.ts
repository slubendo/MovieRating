export async function fetchmovies() {
    const response = await fetch("/api/Movies");
    const data = await response.json();
    return data
}

// export async function createMovies() {
//     const response = await fetch("/api/Movies");
//     const data = await response.json();
//     return data
// }