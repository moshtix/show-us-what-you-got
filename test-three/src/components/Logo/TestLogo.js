import React, { Component } from 'react';
import { render } from 'react-dom';

class TestLogo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="test-logo">
                <div className="logo">
                    Generic Website
                </div>
            </div>
        );
    }
}

export default TestLogo;