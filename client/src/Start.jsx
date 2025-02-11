import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "/MovieSelektLogo.svg";

function Start() {
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState("");
  const [moodIdx, setMoodIdx] = useState(0);
  const [newClassic, setNewClassic] = useState("");
  const [genreIdx, setgenreIdx] = useState(0);
  const [isToggled, setIsToggled] = useState(false);

  const genres = [
    "Action",
    "Comedy",
    "Animation",
    "Mystery",
    "Drama",
    "Fantasy",
    "Horror",
  ];
  const moods = ["Fun", "Serious", "Inspiring", "Scary"];

  let mainQuery = `${userQuery}, I want to watch something ${moods[moodIdx]}, I want to watch a ${newClassic} movie, I like ${genres[genreIdx]} movies`;

  let moodColor;
  switch (moodIdx) {
    case 0:
      moodColor = "Fun";
      break;
    case 1:
      moodColor = "Serious";
      break;
    case 2:
      moodColor = "Inspiring";
      break;
    case 3:
      moodColor = "Scary";
  }

  const buttonChange = () => {
    setIsToggled(!isToggled);
    !isToggled
      ? setNewClassic("im in the mood for a New movie")
      : setNewClassic("im in the mood for a Classic movie");
  };

  //using % if prevGenreIdx + 1 equals genres.length, the index resets to 0.
  const moodChange = () => {
    setMoodIdx((prevMoodIdx) => (prevMoodIdx + 1) % moods.length);
  };

  const genreChange = () => {
    setgenreIdx((prevGenreIdx) => (prevGenreIdx + 1) % genres.length);
  };

  const getResponse = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ Query: mainQuery }),
      headers: {
        "Content-Type": "application/json",
      },
    }; 
    try {
      const response = await fetch("https://movieselekt.onrender.com/userquery", options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { title, image, message } = await response.json();
      if (title) {
        document.getElementById("aiTitle").innerHTML = title;
      } else {
        console.log("no ai title");
      }
      const textContainer = document.getElementById("aimessage");
      if (message) {
        console.log(`client text response ${message}`);
        const textElement = document.createElement("p");
        textElement.className =
          "mt-9 rounded-lg font-custom font-thin p-3 shadow-2xl shadow-black bg-slate-300 bg-opacity-2";
        textElement.innerText = message;
        textContainer.appendChild(textElement);
      } else {
        console.log("no aimessage");
      }

      const imageContainer = document.getElementById("aiimage");
      if (image) {
        const baseImageUrl = "https://image.tmdb.org/t/p/w300";
        const imageUrl = `${baseImageUrl}${image}`;

        // Clear existing images to avoid appending duplicates
        //imageContainer.innerHTML = "";

        // Create and append the new image element
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Movie Poster";
        imgElement.className = "border rounded-lg shadow-md block mb-5 mt-1 mx-auto w-auto sm:w-80";
        imageContainer.appendChild(imgElement);
      } else {
        console.log("No AI image found for this movie");
        //Clear the container if no image exists
        imageContainer.innerHTML = "";
      }
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  };

  return (
    <>
      <section className="min-h-screen max-w-lg mx-auto border-4 border-blue-500 p-5 rounded-3xl shadow-2xl bg-gray-600">
        <div className="w-full h-80 mb-5 -mt-[30px] xs:mt-5 sm:mt-5 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={logo}
            alt="movie logo"
          />
        </div>

        <div className="flex flex-col">
          <div className="my-3 -mt-16 xs:-mt-5 sm:-mt-5">
            <p className="mt-2 pl-2 pb-3 text-gray-50 text-[16px] max-w-[500px] font-semibold">
              What's your favourite movie and why ?
            </p>

            <textarea
              name="userInput"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              maxLength="115"
              placeholder="The Pursuit of Happiness because it taught me to never give up hope no matter how hard life gets"
              className="mt-2 p-2 text-gray-950 text-[16px] max-w-[500px] overflow-hidden font-medium"
            />
          </div>
          <div className="my-3">
            <p className="mt-2 pl-2 pb-3 text-gray-50 text-[16px] max-w-[500px] font-semibold">
              {" "}
              Are you in the mood for A New or Classic movie ?
            </p>
            <button
              onClick={buttonChange}
              className={`toggle-button ${isToggled ? "new" : "classic"}`}
            >
              {isToggled ? "New" : "Classic"}
            </button>
          </div>
          <div className="my-3">
            <p className="mt-2 pl-2 pb-3 text-gray-50 text-[16px] max-w[500px] font-semibold">
              {" "}
              What are you in the mood for ?
            </p>
            <button onClick={moodChange} className={`mood-button ${moodColor}`}>
              {moods[moodIdx]}
            </button>
          </div>
          <div className="my-3">
            <p className="mt-2 pl-2 pb-3 text-gray-50 text-[16px] max-w-[500px] font-semibold">
              {" "}
              What movie genres do you like ?
            </p>
            <button onClick={genreChange} className={"genre-button"}>
              {genres[genreIdx]}
            </button>
          </div>
          <div className="-mt-6 mb-6">
            <button
              disabled={!userQuery}
              style={{ paddingTop: "12px" }}
              className="button-53"
              onClick={() => {
                getResponse();
                navigate("response");
              }}
            >
              Let's Go
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Start;
