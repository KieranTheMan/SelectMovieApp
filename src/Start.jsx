import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Style.css'
import logo from '/MovieSelektLogo.svg'


function Start() {
const navigate = useNavigate();
const [query, setQuery] = useState('')

console.log(query)


const getResponse = async () => {
  const options = { 
    method: "POST",
    body: JSON.stringify({Query:query}),
    headers:{
    "Content-Type":"application/json"
    }
  };
      try{
          const response = await fetch('http://localhost:8000/userquery',options)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const GPTResponse = await response.json();
          console.log(`client response ${GPTResponse.message}`);
          document.getElementById('aimessage').innerHTML = GPTResponse.message; 
          } catch (error) {
          console.error('Error:', error)
      }
}

  return (
    <>
      <div className='background'>
        <div>
            <img src={logo} alt="movie logo"/>
        </div>
            <div>
              <p>What's Your Favorite Movie And Why?</p>
                <textarea 
                  name='userInput' 
                  value={query}
                  onChange={(e => setQuery(e.target.value))} 
                  maxLength="115"
                  placeholder='The block Because it taught me to never give up hope no matter how hard life gets'
                />
            </div>
            <div>
              <p> Are You Feeling A New or Classic Movie?</p>
             
            </div>
            <div>
              <p> Do You Want To Have Fun Or Serious?</p>
                <textarea name='userInput' maxLength="115" placeholder='I whant to wwatch somthing stupid and fun'/>
            </div>
                  <div style={{paddingTop: 20 }}>
                    <button 
                      className='button-53' 
                      onClick={() => {
                      getResponse()
                      navigate('response')}} 
                    >
                        Let's Go
                    </button>
                  </div>
        </div>
    </>
  )
}

export default Start
