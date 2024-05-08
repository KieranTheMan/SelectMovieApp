import './Style.css'
import logo from '/MovieSelektLogo.svg'

function AiResponse() {
  return (
    <>
      <div className='background'>
        <div>
            <img src={logo} alt="movie logo" />
        </div>
            <div>
                <textarea  name='userInput'/>
            </div>
                  <div style={{paddingTop: 20 }}>
                    <button className='button-53'>
                        Go Again
                    </button>
                  </div>
        </div>
    </>
  )
}

export default AiResponse
