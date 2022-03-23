import axios from 'axios'

const getAllMovies = async () =>
{
  let resp = await axios.get("https://api.tvmaze.com/shows");
  return resp;
}
const getAllMembers = async () =>
{
  let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
  return resp;
}

export default {getAllMovies,getAllMembers};