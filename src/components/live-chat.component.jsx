import { useState } from "react";
import ChatItem from "./chat-item.component";
import useWebSocket from "react-use-websocket";

const webSocket_URL = "ws://127.0.0.1:3000";

export const LiveChat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  useWebSocket(webSocket_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return (
    <>
      {chatOpen ? (
        <div className="live-chat">
          <div className="chat-box"></div>
          <form className="chat-form">
            <input placeholder="Jūsų žinutė"></input>
            <button>Siųsti</button>
          </form>
          <button
            className="live-chat__close"
            onClick={() => setChatOpen(false)}
            title="Uždaryti"
          >
            <svg
              version="1.1"
              id="live-close"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="122.883px"
              height="122.882px"
              viewBox="0 0 122.883 122.882"
              enableBackground="new 0 0 122.883 122.882"
              xmlSpace="preserve"
            >
              <g>
                <path d="M61.441,0C44.475,0,29.115,6.877,17.996,17.996C6.877,29.115,0,44.475,0,61.441c0,16.966,6.877,32.326,17.996,43.445 c11.119,11.118,26.479,17.995,43.445,17.995c16.967,0,32.327-6.877,43.446-17.995c11.119-11.119,17.996-26.479,17.996-43.445 c0-16.967-6.877-32.327-17.996-43.445C93.768,6.877,78.408,0,61.441,0L61.441,0z M51.505,42.166 c-1.735-1.784-1.696-4.637,0.088-6.372c1.784-1.735,4.637-1.696,6.373,0.088l21.839,22.521l-3.23,3.142l3.244-3.146 c1.738,1.792,1.693,4.652-0.098,6.39c-0.053,0.05-0.105,0.099-0.158,0.146L57.966,87.017c-1.735,1.784-4.588,1.823-6.373,0.088 c-1.784-1.734-1.823-4.588-0.088-6.372l18.78-19.201L51.505,42.166L51.505,42.166z M24.386,24.386 C33.869,14.903,46.97,9.038,61.441,9.038c14.471,0,27.573,5.865,37.055,15.348c9.484,9.483,15.35,22.584,15.35,37.056 c0,14.471-5.865,27.572-15.35,37.055c-9.482,9.483-22.584,15.349-37.055,15.349c-14.471,0-27.572-5.865-37.055-15.349 C14.903,89.014,9.038,75.912,9.038,61.441C9.038,46.97,14.903,33.869,24.386,24.386L24.386,24.386z" />
              </g>
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setChatOpen(true)}
          title="Bendrauti gyvai"
          className="live-chat__open"
        >
          <svg
            version="1.1"
            id="live-icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="111.686px"
            height="122.879px"
            viewBox="0 0 111.686 122.879"
            enableBackground="new 0 0 111.686 122.879"
            xmlSpace="preserve"
          >
            <g>
              <path d="M83.896,5.08H27.789c-12.491,0-22.709,10.219-22.709,22.71v40.079c0,12.489,10.22,22.71,22.709,22.71h17.643 c-2.524,9.986-5.581,18.959-14.92,27.241c17.857-4.567,31.642-13.8,41.759-27.241h3.051c12.488,0,31.285-10.219,31.285-22.71V27.79 C106.605,15.299,96.387,5.08,83.896,5.08L83.896,5.08z M81.129,41.069c-4.551,0-8.24,3.691-8.24,8.242s3.689,8.242,8.24,8.242 c4.553,0,8.242-3.691,8.242-8.242S85.682,41.069,81.129,41.069L81.129,41.069z M30.556,41.069c-4.552,0-8.242,3.691-8.242,8.242 s3.69,8.242,8.242,8.242c4.551,0,8.242-3.691,8.242-8.242S35.107,41.069,30.556,41.069L30.556,41.069z M55.843,41.069 c-4.551,0-8.242,3.691-8.242,8.242s3.691,8.242,8.242,8.242c4.552,0,8.241-3.691,8.241-8.242S60.395,41.069,55.843,41.069 L55.843,41.069z M27.789,0h56.108h0.006v0.02c7.658,0.002,14.604,3.119,19.623,8.139l-0.01,0.01 c5.027,5.033,8.148,11.977,8.15,19.618h0.02v0.003h-0.02v40.079h0.02v0.004h-0.02c-0.004,8.17-5.68,15.289-13.24,20.261 c-7.041,4.629-15.932,7.504-23.104,7.505v0.021H75.32v-0.021h-0.576c-5.064,6.309-10.941,11.694-17.674,16.115 c-7.443,4.888-15.864,8.571-25.31,10.987l-0.004-0.016c-1.778,0.45-3.737-0.085-5.036-1.552c-1.852-2.093-1.656-5.292,0.437-7.144 c4.118-3.651,6.849-7.451,8.826-11.434c1.101-2.219,1.986-4.534,2.755-6.938h-10.95h-0.007v-0.021 c-7.656-0.002-14.602-3.119-19.622-8.139C3.138,82.478,0.021,75.53,0.02,67.871H0v-0.003h0.02V27.79H0v-0.007h0.02 C0.021,20.282,3.023,13.46,7.878,8.464C7.967,8.36,8.059,8.258,8.157,8.16c5.021-5.021,11.968-8.14,19.628-8.141V0H27.789L27.789,0 z" />
            </g>
          </svg>
        </button>
      )}
    </>
  );
};

export default LiveChat;