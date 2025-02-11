import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Loader from "./Loader";

function AiResponse() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 40000);
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <section className="flex justify-center flex-col items-center min-h-screen sm:min-h-screen max-w-lg mx-auto border-4 border-blue-500 p-5 rounded-3xl shadow-2xl bg-gray-600">
        {loading && (
          <div>
            <Loader />
          </div>
        )}
        <div className={`visable-content ${loading ? "hidden" : ""}`}>
          <div className="flex items-center flex-col xs:my-10">
            <div
              id="aiTitle"
              className="font-custom font-bold text-4xl sm:text-5xl p-3 my-3 text-center"
            />
            <div
              id="aiimage"
            />
            <div
              id="aimessage"
            />
            <div>
              <button
                className="button-53 shadow-lg shadow-black"
                onClick={() => navigate("/")}
              >
                Go Again
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AiResponse;
