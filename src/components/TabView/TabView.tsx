import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class TabView extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }

    render() {
        return (
            <div>
                <p>'Hi'</p>
            </div>
        )
    }
}