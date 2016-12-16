import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Headers from './Headers';
import * as audio from './audio';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      data: []
    };
  }

  handleResize(event) {
    this.setState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('keypress', function(e) {
      if (e.keyCode === 32) {
        audio.play("countdown");
      }
    });
    let rows = 0;
    data.forEach(category => {
      if (category.questions.length > rows) {
        rows = category.questions.length;
      }
    });
    this.setState({data: data, rows: rows, cols: data.length});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    let headerHeight = this.state.windowWidth > 640 ? 100 : 40,
        cardWidth = this.state.windowWidth / this.state.cols,
        cardHeight = (this.state.windowHeight - headerHeight) / this.state.rows,
        cards = [];

    this.state.data.forEach((category, categoryIndex) => {
      let left = categoryIndex * cardWidth;
      category.questions.forEach((question, questionIndex) => {
        cards.push(<Card left={left} top={questionIndex * cardHeight + headerHeight} height={cardHeight} width={cardWidth} question={question} key={categoryIndex + '-' + questionIndex}/>);
      })
    });
    return (
      <div>
        <Headers data={this.state.data} headerWidth={cardWidth} />
        <div className="cardContainer">{cards}</div>
      </div>
    );
  }

};

ReactDOM.render(
  <App/>, document.getElementById('app'));
