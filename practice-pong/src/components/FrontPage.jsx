import React from "react";

function FrontPage() {

    function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < 6; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
      
return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
    }}>
      <h1>Push Up Pong</h1>
      <div>
        <button>Create Game</button>
      </div>
      <div>
        <p>OR</p>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <p style={{textAlign:'center'}}>Enter Code to Join</p>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <input type="text" placeholder="Code" id="code"/>
            <button>Join</button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;