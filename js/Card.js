import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'points',
      completed: false,
      correct: null
    };
    this.app = props.app
  }

  clickHandler(event) {
    if (!this.state.completed) {
      if (this.state.view === 'points') {
        this.setState({view: 'question', flipping: true});
      } else if (this.state.view === 'question') {
        this.setState({view: 'answer'});
      } else {
        //this.setState({view: 'points', completed: true, flipping: true});
      }
    }
    return;
  }
  
  clickHandlerYes(event) {
    if (!this.state.completed && this.state.view === 'answer') {
      this.setState({view: 'points', completed: true, flipping: true});
      this.app.updateScore(this.props.question.points)

    }
    return;
  }
  
  clickHandlerNo(event) {
    if (!this.state.completed && this.state.view === 'answer') {
      this.setState({view: 'points', completed: true, flipping: true});
    
    }
    return;
  }

  getLabelBack() {
    return {
      __html: this.state.view === 'question'
        ? this.props.question.question
        : this.props.question.answer
    };
  }

  transitionEndHandler(event) {
    if (event.propertyName === 'width') {
      this.setState({flipping: false});
    }
  }

  render() {
    console.log("Render Card")
    let style = {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        transform: 'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)',
        WebkitTransform: 'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)'
      }
      let front = null

      if(this.state.completed) {
        front = <img src='assets/img/image.svg'/>
      } else {
        front = <span className='points'>{this.props.question.points}</span>
      }
    let className = 'flipper';

    if (this.state.view !== 'points') {
      className = className + ' flipped';
    }
    if (this.state.flipping) {
      className = className + ' flipping';
    }
    return (
      <div
        style={style}
        className={className + ' ' + this.props.className}
        onClick={this.clickHandler.bind(this)}
        onTransitionEnd={this.transitionEndHandler.bind(this)}
      >
        <div className='card'>
          <div className='front'>
            {front}
          </div>
          <div className='back'>
            <span dangerouslySetInnerHTML={this.getLabelBack()}/>
            <div onClick={this.clickHandlerYes.bind(this)} hidden={this.state.view !== 'answer'}>Yes</div>
            <div onClick={this.clickHandlerNo.bind(this)} hidden={this.state.view !== 'answer'}>No</div>
            {/* <img src='assets/img/image.svg' onClick={this.clickHandlerNo.bind(this)}/> */}
          </div>
        </div>
      </div>
    );
  }

};

export default Card;
