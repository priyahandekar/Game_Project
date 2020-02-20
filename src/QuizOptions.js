import React, { Component } from 'react';

class QuizOptions extends Component {
    render() {
        return(
            <div className="fields" onClick = {() => this.props.checkResults(this.props.option)}>
                <div className="field-block">{this.props.option}</div></div>

        );
    }
}

export default QuizOptions;