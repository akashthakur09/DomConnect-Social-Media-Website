import axios from "axios";
const setAuthToken = token => {
<<<<<<< HEAD
  if (token){
    
    axios.defaults.headers.common["Authorization"] = token;
  }else{
    
=======
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
>>>>>>> 9a4abe8a2d5dfee95913f4db632c5b15fc8850db
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;