/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Form extends React.Component {
  // specify schema of context data that can be passed down
  static childContextTypes = {
    handleSubmit: PropTypes.func.isRequired
  }
  // set the context for all children of this element
  getChildContext() {
    return { handleSubmit: this.handleSubmit }
  }
  // gets passed down in context
  handleSubmit(event) {
    console.log('test', event.target)
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

class SubmitButton extends React.Component {
  // opt-in to this context data from up somewhere in parents
  static contextTypes = {
    handleSubmit: PropTypes.func.isRequired
  }
  render() {
    return <button onClick={this.context.handleSubmit.bind(this)}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  // opt-in to this context data from up somewhere in parents
  static contextTypes = {
    handleSubmit: PropTypes.func.isRequired
  }
  handleKeyup(event) {
    if (event.key === 'Enter') {
      this.context.handleSubmit(event)
    }
  }
  render() {
    return (
      <input
        onKeyUp={this.handleKeyup.bind(this)}
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert('YOU WIN!')
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
