import React, { useEffect } from 'react';
import agoraHelpers from './helpers/agora';

const App = () => {
  useEffect(() => {
    agoraHelpers.startVideoCall();
  }, []);

  return (
    <div>
      <h2 className="left-align">Agora Video Web SDK Quickstart</h2>
      <div className="row">
        <div>
          <button type="button" id="join" onClick={agoraHelpers.handleJoin}>
            JOIN
          </button>
          <button type="button" id="leave" onClick={agoraHelpers.handleLeave}>
            LEAVE
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
