import React from 'react';
import logo from './logo.svg';
import './App.css';
let rebrandlyClient = require("./rebrandly.js")

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGenerated: false,
      url: '',
    };
  }
  componentWillMount() {

  }

  generateURL(url) {
    let rebrandlyClient = require("./rebrandly.js")
    let slashtag = `test-${Math.floor(Math.random() * 999999)}`
    
    let linkDef = {
      "title": "Shortend link",
      "slashtag": slashtag,
      "destination": url
    };

    let onError = (err) => {
      console.log(JSON.stringify(err))
    }

    let onLinkCreated = (link) => {
      this.setState({ ShortURL: link.shortUrl }, () => {
        this.render();
      })
      console.log(`Short URL is: https://${link.shortUrl}`)
    }
    rebrandlyClient.createNewLink(linkDef, onLinkCreated, onError);
  }

  generate = () => {
    this.setState({ isGenerated: true }, () => {
      this.generateURL(this.state.url);
    })
    
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  render() {
    return (
      <div className="App">
        Enter URL: <input type="text" name="url" value={this.state.url} onChange={e => this.handleChange(e)}></input>
        <button type="button" onClick={this.generate}>Generate</button>
        <br></br>
        {
          this.state.isGenerated &&
          <label>{this.state.ShortURL}</label>
        }
      </div>
    );
  }
}

export default App;
