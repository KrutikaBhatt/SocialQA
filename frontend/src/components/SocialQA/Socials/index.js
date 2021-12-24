import React from 'react'
import Header from '../Header'
import UserFeed from './UserFeed'

function Index() {
    return (
        <div className="quora">
      <Header />
      <div className="quora__contents">
        <div style = {{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }} className="quora__content">
          <div style = {{
            margin: "20px",
            marginTop: "0px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0",
            paddingLeft: "5px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            backgroundColor: "white"
          }} className = 'torch'>
            <img style = {{
            objectFit: "contain"
          }} width = {200} alt = 'spaces' src = 'https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_darkmode.png-26-de0e3d9c488b2b12.png'  />
          <br></br>
          <h3>Add topics for a customized feed with questions you can answer.</h3>
          </div>
          {/* <Sidebar /> */}
          
          {/* <Widget /> */}
          <UserFeed />
        </div>
      </div>
    </div>
    )
}

export default Index
