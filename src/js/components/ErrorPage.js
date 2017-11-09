import React from 'react';



export default class ErrorPage extends React.Component {

    render() {
        const url = `../../assets/img/Sad book.png`;

        return (

            <div className='error-wrapper'>
                <img src={url} />
                <h1>You just got 404'D</h1>
                <br /><br />
                <h2>The page you are looking for does not exist. Sorry :( </h2>
                <button onClick={() => (this.props.history.push(`/`))}>Back to shopping</button>
            </div>

        )
    }
}