////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition` a "higher-order component" that sends the mouse
// position to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

const withMousePosition = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        mouse: {
          x: 1,
          y: 1,
        }
      }
    }
    state = {
      mouse: {
        x: 0,
        y: 0
      }
    }
    handleMouseMove(event) {
      this.setState({ mouse: { x: event.screenX, y: event.screenY } })
    }
    // return Component
    render() {
      return (
        <Component {...this.props} mouse={this.state.mouse} handleMouseMove={this.handleMouseMove.bind(this)} />
      )
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    handleMouseMove: PropTypes.func.isRequired
  }

  render() {
    const { mouse } = this.props

    return (
      <div style={{ height: '100%' }} onMouseMove={this.props.handleMouseMove.bind(this)}>
        {mouse ? (
          <h1>The mouse position is ({mouse.x}, {mouse.y})</h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    )
  }
}

const AppWithMouse = withMousePosition(App)

ReactDOM.render(<AppWithMouse/>, document.getElementById('app'))
