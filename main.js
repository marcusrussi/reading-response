// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var createCard = function(name, age, url) {
    return {name: name, age: age, url: 'images/' + url};
}

var Cards = React.createClass({
  getInitialState: function() {
    return {
        items: [
            createCard('Dopamine (its been a long day)', 23, 'dopamine.jpg'),
            createCard('Ugly, but really cool', 25, 'ugly.jpg'),
            createCard('Not on Tinder, deep thinker', 20, 'noton.jpg'),
            createCard('Eternal Satisfaction', 10000, 'eternal.jpg'),
            createCard('Shallow but hot', 23, 'shallow.jpg'),
            createCard('♥s u but ur 2 shy', 21, 'cool.jpg'),
            createCard('Abused his last gf', 22, 'abuser.jpg'),
            createCard('You\'re about to get run over!', 24, 'car.jpg'),
            createCard('Put me down & talk to ur friend', 21, 'friend.jpg'),

        ]
    };
  },
  handleRemove: function(i) {
    console.log('clicked');
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
    var items = this.state.items.map(function(item, i) {
        console.log(item);
      return (
        <Card index={i}
              key={item.name}
              onClickButtons={this.handleRemove.bind(this, i)}
              name={item.name}
              age ={item.age}
              url ={item.url} />
      );
    }.bind(this));
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Name = React.createClass({
    render: function() {
        return (
            <div className="t-name">
                <span className="t-name-name">
                    {this.props.name}
                </span>
                <span className="t-name-age">
                    , {this.props.age}
                </span>
            </div>
        );
    }
});

var Photo = React.createClass({
    render: function() {
        var style = {
            backgroundImage: 'url(' + this.props.url + ')',
            backgroundStyle: 'cover'
        };
        return <div className="t-photo" style={style}></div>;
    }
});

var Card = React.createClass({
    render: function() {
        console.log('Rerendering ' + this.props.name);
        var className = 't-card';
        var style = {};
        if (this.props.index == 0) {
            className = className + ' ' + 't-card-front';
        } else {
            style = {display: 'none'};
        }
        return (
            <div className={className} style={style}>
                <Photo url={this.props.url}/>
                <Name name={this.props.name} age={this.props.age}/>
                <div className='t-button' style={{cursor:'pointer'}} onClick={this.props.onClickButtons}/>
            </div>
        );
    }
});

ReactDOM.render(
  <Cards/>,
  document.getElementById('app')
);
