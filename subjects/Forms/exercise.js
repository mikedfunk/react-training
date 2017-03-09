////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      shippingSameAsBilling: false,
      billingName: '',
      billingState: '',
      shippingName: '',
      shippingState: ''
    }
  }

  componentWillMount() {
    const formState = localStorage.formState
    if (formState) {
      this.setState(JSON.parse(formState))
    }
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      localStorage.formState = JSON.stringify(this.state)
    }
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input type="text" defaultValue={this.state.billingName} onChange={event => this.setState({ billingName: event.target.value })}/></label>
            </p>
            <p>
              <label>Billing State: <input type="text" size="2" defaultValue={this.state.billingState} onChange={event => this.setState({ billingState: event.target.value })}/></label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input type="checkbox" name="same-as-billing" checked={this.state.shippingSameAsBilling} onChange={event => this.setState({ shippingSameAsBilling: event.target.checked })} /> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input type="text" disabled={this.state.shippingSameAsBilling} value={this.state.shippingSameAsBilling ? this.state.billingName : this.state.shippingName} onChange={event => this.setState({ shippingName: event.target.value })}/></label>
            </p>
            <p>
              <label>Shipping State: <input type="text" size="2" value={this.state.shippingSameAsBilling ? this.state.billingState : this.state.shippingState} disabled={this.state.shippingSameAsBilling} onChange={event => this.setState({ shippingState: event.target.value })}/></label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm/>, document.getElementById('app'))
