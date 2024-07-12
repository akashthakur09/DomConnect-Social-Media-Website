import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./../auth/auth-help";
import jwt1 from "jwt-decode";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { searchuser,read } from "../api/api-post";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';


import "./chat.css";
import "./navbar.css";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);
  const loading = searchResult.length !== 0 && open;
  const jwt = auth.isAuthenticated();
  const user1 = jwt1(jwt.token);
  const nav = useNavigate();
  const [values, setValues] = useState({});
  
  // Debounce timer
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (search !== "") {
      setDebounceTimeout(setTimeout(() => {
        searchuser(
          { userId: user1.id },
          { t: jwt.token },
          { search: search }
        ).then((data) => {
          setSearchResult(data);
        });
      }, 1000)); // 1000ms = 1 second debounce
    } else {
      setSearchResult([]);
    }
  }, [search]);

  useEffect(() => {
    read(
      { userId: user1.id },
      { t: jwt.token }
    ).then((data) => {
      if (data) console.log(data);
      setValues({
        ...values,
        id: data._id,
        name: data.name,
        email: data.email,
        image: data.image,
        about: data.about,
        update: data.updated,
      });
    });
  }, []);

  return (
    <div>
      <nav className="py-2 position-fixed top-0 pr-4 start-0 w-100 shadow-sm navbar">
        <div className="container d-flex justify-content-between align-items-center w-100 innerNavbar">
          <a style={{ textDecoration: "none", color: "#002C54" }}>
            <h1
              onClick={() => { nav("/home"); }}
              className="logo fs-3 fw-bold"
              style={{ cursor: "pointer" }}
            >
              DomConnect
            </h1>
          </a>
          
          <div className="mr-5 position-relative d-flex searchBox">
            <Stack sx={{ width: 100 }}>
              <Autocomplete
                className="rounded"
                size="small"
                id="asynchronous-demo"
                sx={{ width: 200 }}
                options={searchResult}
                loading={loading}
                open={open}
                onOpen={() => { setOpen(true); }}
                onClose={() => { setOpen(false); setSearchResult([]); }}
                onChange={(event, value) => nav("/user/" + value._id)} // navigate to user profile when selected
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 }}}
                    {...props}
                  >
                    <img
                      className="rounded-circle me-3"
                      loading="lazy"
                      width="10"
                      height="30"
                      src={option.image}
                      alt=""
                    />
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    className={"rounded bg-white"}
                    sx={{
                      p: "8px 12px", // Adjust padding for more space
                      borderRadius: "20px", // Make border-radius rounder
                      border: "1px solid #dbdbdb", // Add border to mimic Instagram's search bar
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow for depth
                    }}
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    {...params}
                    placeholder="Search here"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1, // Adjust padding-left for icon alignment
                            color: "text.secondary",
                          }}
                        >
                          <SearchIcon /> {/* Add a search icon */}
                        </Box>
                      ),
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          </div>

          <div className="logo rounded-circle d-flex align-items-center">
            <i
              className="fas fa-sign-out-alt fs-3 me-4"
              onClick={() => {
                localStorage.removeItem("userInfo1");
                nav("/");
              }}
            />
            <FontAwesomeIcon 
        icon={faFacebookMessenger} 
        className="me-4 fs-3"
        onClick={() => { nav("/chat/join"); }} 
        style={{ cursor: 'pointer' }}
      />
            <div
              onClick={() => { nav("/user/" + values.id); }}
            >
              <img
                src={values.image}
                alt="profile"
                width="40px"
                height="40px"
                className="rounded-circle"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
