import React from "react";
import { useDispatch } from "react-redux";
import { setResponseStatus } from "./../Redux/actions/index";

function ErrorBox() {
  const dispatch = useDispatch();
  return (
    <div className="mt-5">
      <div className="alert shadow-lg alert-error w-11/12 mx-auto">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Invalid City.</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm btn-ghost" onClick={() => dispatch(setResponseStatus('OK'))}>🗙</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
