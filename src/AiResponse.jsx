import { useNavigate } from 'react-router-dom'
import './Style.css'
import logo from '/MovieSelektLogo.svg'
import { useEffect, useState } from 'react';





function AiResponse() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },6000)
  }, []);

const navigate = useNavigate();
  return (
    <>
      
      
                <div className='ex-userInterfaceBG'>
                  
                  {loading && <div className="custom-loader"></div>}
            <div className={`visable-content ${loading ? 'hidden' : ''}`}>
                          <div id='aiTitle'></div>
                          <div id='aiimage'/>
                          <p id='aimessage'></p>
                      
                          <button  className='button-53' onClick={() => navigate('/')}>
                                  Go Again
                              </button>
                      
                      </div>
                      
                     
                      
          </div>
    </>
  )
}

export default AiResponse
