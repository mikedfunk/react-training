////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    scrollTop: 0,
    availableHeight: window.innerHeight,
    rowHeight: this.props.rowHeight
  }

  // componentDidUpdate() {
  //   console.log(this.state)
  // }

  render() {
    const { availableHeight, scrollTop } = this.state
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const items = []

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight))
    const endIndex = Math.min(numRows, startIndex + Math.ceil(availableHeight / rowHeight))
    const rowCount = (endIndex - startIndex)

    let index = startIndex
    console.log(index, endIndex)
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    this.handleScroll = (scrollTop) => {
      this.setState({ scrollTop })
      // console.log(scrollTop)
    }
    return (
      <div
        style={{ height: '100%', overflowY: 'scroll' }}
        onScroll={event => this.handleScroll(event.target.scrollTop)}
      >
        <ol style={{ height: totalHeight, paddingTop: (startIndex * rowHeight)}}>
          {items}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <RainbowList
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
