import { useNavigate } from 'react-router-dom'
import './Style.css'
import logo from '/MovieSelektLogo.svg'

function AiResponse() {
const navigate = useNavigate();
  return (
    <>
      <div className='background'>
        <div>
            <img id='logo' src={logo} alt="movie logo" />
        </div>
            <div>
                <div id='aiimage'/>
                <p id='aimessage'></p>
            </div>
                  <div style={{paddingTop: 20 }}>
                    <button className='button-53' onClick={() => navigate('/')}>
                        Go Again
                    </button>
                  </div>
      </div>
    </>
  )
}

export default AiResponse
