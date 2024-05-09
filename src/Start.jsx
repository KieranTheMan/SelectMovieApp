import { useNavigate } from 'react-router-dom';
import './Style.css'
import logo from '/MovieSelektLogo.svg'


function Start() {
const navigate = useNavigate();
  return (
    <>
      <div className='background'>
        <div>
            <img src={logo} alt="movie logo"/>
        </div>
            <div>
              <p>What's Your Favorite Movie And Why?</p>
                <textarea  name='userInput' maxlength="115" placeholder='The block Because it taught me to never give up hope no matter how hard life gets' />
            </div>
            <div>
              <p> Are You Feeling A New or Classic Movie?</p>
                <textarea name='userInput' maxlength="115" placeholder='I whant to watch movies that was realsed in 2020'/>
            </div>
            <div>
              <p> Do You Want To Have Fun Or Serious?</p>
                <textarea name='userInput' maxlength="115" placeholder='I whant to wwatch somthing stupid and fun'/>
            </div>
                  <div style={{paddingTop: 20 }}>
                    <button className='button-53' onClick={() => navigate('response')}>
                        Let's Go
                    </button>
                  </div>
        </div>
    </>
  )
}

export default Start
