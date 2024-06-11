import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import logo from "/MovieSelektLogo.svg";

function Start() {
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState("");
  const [moodIdx, setMoodIdx] = useState(0);
  const [newClassic, setNewClassic] = useState("");
  const [genreIdx, setgenreIdx] = useState(0);

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
  const [isToggled, setIsToggled] = useState(false);
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
      ? newClassic("im in the mood for a New movie")
      : setNewClassic("im in the mood for a Classic movie");
  };

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
      const response = await fetch("http://localhost:8000/userquery", options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { title, image, message } = await response.json();
      console.log(`client text response ${message}`);
      document.getElementById("aimessage").innerHTML = message;
      console.log(`client IMAGE response ${image}`);
      document.getElementById("aiTitle").innerHTML = title;

      // The base URL for TMDb images
      const baseImageUrl = "https://image.tmdb.org/t/p/w300";
      const imageUrl = `${baseImageUrl}${image}`;
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;

      const container = document.getElementById("aiimage");
      container.appendChild(imgElement);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className='userInterfaceBG'>
        <img className='logo' src={logo} alt='movie logo' />

        <div className='textBoxes'>
          <div>
            <p className='start-p'>What's your favorite movie and why?</p>

            <textarea
              name='userInput'
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              maxLength='115'
              placeholder='The Pursuit of Happiness because it taught me to never give up hope no matter how hard life gets'
            />
          </div>
          <div>
            <p className='start-p'>
              {" "}
              Are you in the mood for A New or Classic movie?
            </p>
            <button
              onClick={buttonChange}
              className={`toggle-button ${isToggled ? "new" : "classic"}`}
            >
              {isToggled ? "New" : "Classic"}
            </button>

            <p className='start-p'> What are you in the mood for ?</p>
            <button onClick={moodChange} className={`mood-button ${moodColor}`}>
              {moods[moodIdx]}
            </button>

            <p className='start-p'> What movie genres do you like ?</p>
            <button onClick={genreChange} className={"genre-button"}>
              {genres[genreIdx]}
            </button>
          </div>
        </div>

        <button
          disabled={!userQuery}
          style={{ paddingTop: 20 }}
          className='button-53'
          onClick={() => {
            getResponse();
            navigate("response");
          }}
        >
          Let's Go
        </button>
      </div>
    </>
  );
}

export default Start;
