import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - 100,
      cards: [],
      showFinal: false,
    };
  }

  handleResize(event) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - 100
    });
  }

  handleFinal(event) {
    if (event.which === 70) {
      this.setState({ showFinal: true });
    }
  }

  componentWillMount() {
    const finalJeopardy = data.splice(0, 1);
    const normalCards = data;

    window.addEventListener('keypress', this.handleFinal.bind(this));

    window.addEventListener('resize', this.handleResize.bind(this));
    let rows = 0;

    normalCards.forEach(category => {
      if (category.questions.length > rows) {
        rows = category.questions.length;
      }
    });

    this.setState({
      cards: normalCards,
      rows: rows,
      cols: normalCards.length,
      finalJeopardy: finalJeopardy[0],
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    let headerHeight = this.state.windowWidth > 640 ? 150 : 40,
        cardWidth = this.state.windowWidth / this.state.cols,
        cardHeight = (this.state.windowHeight - headerHeight) / this.state.rows,
        headers = [],
        cards = [];

    this.state.cards.forEach((category, categoryIndex) => {
      headers.push(
        <span className="header" key={categoryIndex} style={{ width: cardWidth - 30 }}>
          {category.category}
        </span>
      );

      let left = categoryIndex * cardWidth;
      category.questions.forEach((question, questionIndex) => {
        cards.push(
          <Card
            key={categoryIndex + '-' + questionIndex}
            left={left}
            top={questionIndex * cardHeight + headerHeight}
            height={cardHeight}
            width={cardWidth}
            question={question}
          />
        );
      })
    });

    return (
      <div>
        <div className='headers'>{headers}</div>
        <div className="cardContainer">
          {this.state.showFinal && <Card
            className="finalJeopardy"
            left={cardWidth}
            top={cardHeight + headerHeight}
            height={cardHeight}
            width={cardWidth}
            question={this.state.finalJeopardy.questions[0]}
          />}
          {cards}
        </div>
      </div>
    );
  }

};

ReactDOM.render(<App/>, document.getElementById('app'));
