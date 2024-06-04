import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Style.css'
import logo from '/MovieSelektLogo.svg'


function Start() {
const navigate = useNavigate();
const [query1, setQuery1] = useState('');
const [query2, setQuery2] = useState('');
const [query3, setQuery3] = useState('');

let mainQuery = `${query1}, ${query2}, ${query3}`;

console.log(mainQuery)


const getResponse = async () => {
  const options = { 
    method: "POST",
    body: JSON.stringify({Query:query1}),
    headers:{
    "Content-Type":"application/json"
    }
  };
      try{
          const response = await fetch('http://localhost:8000/userquery',options)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const {title, image, message} = await response.json();
          console.log(`client text response ${message}`);
          document.getElementById('aimessage').innerHTML = message;
          console.log(`client IMAGE response ${image}`)
          document.getElementById('aiTitle').innerHTML = title;
          
          // The base URL for TMDb images
          const baseImageUrl = 'https://image.tmdb.org/t/p/w300';
          const imageUrl = `${baseImageUrl}${image}`;
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.style.margin= auto;


          const container = document.getElementById('aiimage');
          container.appendChild(imgElement);
          } catch (error) {
          console.error('Error:', error)
          
      }
      
}

  return (
    <>
      
      <div className='userInterfaceBG'>
       
            <img className='logo' src={logo} alt="movie logo"/>
      
        <div  className='textBoxes'>
            <div>
              <p className='start-p'>What's your favorite movie and why?</p>
                <textarea 
                  name='userInput' 
                  value={query1}
                  onChange={(e => setQuery1(e.target.value))} 
                  maxLength="115"
                  placeholder='The block Because it taught me to never give up hope no matter how hard life gets'
                />
            </div>
            <div>
              <p className='start-p'> Are you in the mood for A New or Classic movie?</p>
              <textarea 
                name='userInput'
                value={query2}
                onChange={(e => setQuery2(e.target.value))}  
                maxLength="115" 
                placeholder='I whant to watch somthing silly and fun'
                />
             
            </div>
            <div>
              <p className='start-p'> Do you want A fun or serious movie?</p>
                <textarea 
                name='userInput'
                value={query3}
                onChange={(e => setQuery3(e.target.value))}  
                maxLength="115" 
                placeholder='I whant to watch somthing silly and fun'
                />
            </div>
          </div>
                 
                    <button
                    style={{paddingTop: 20} }
                      className='button-53' 
                      onClick={() => {
                      getResponse()
                      navigate('response')}} 
                    >
                        Let's Go
                    </button>
                
        </div>
    </>
  )
}

export default Start
