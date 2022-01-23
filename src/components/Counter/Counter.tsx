import React, { Component } from 'react'
import Count from '../Count'

interface Props {
    count: number
}
interface State {
    count: number
}

export default class Counter extends React.Component<Props, State> {
    state: State = {
        count: this.props.count
    }

    increment = () => {
        this.setState({
            count: (this.state.count + 1)
        })
    }

    decrement = () => {
        this.setState({
            count: (this.state.count - 1)
        })
    }

    render () {
        return (
            <div>
                <Count count={this.state.count} />
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        )
    }
}