import React, { Component } from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames'

class Quiz extends Component {
    constructor(props) {
        super(props);
        let riddle = this.playGame();
        this.state = {
            riddle,
            correct: false,
            gameOver: false,
            wrongMessage: 'ohhh ohhh! Hit the button below to Play again',
            correctMessage: 'Good Job! Hit the button below to Play again'
        }
    }
    generateRandomOptions = (sum) => {
        
        let resultArray = [];
        let randomNumberArray = [];
        while(randomNumberArray.length <= 3) {
            let randomNumber = this.randomNumber(1,19);
            if(randomNumberArray.indexOf(randomNumber) > -1) continue;
            randomNumberArray.push(randomNumber);
        }

        for(var i = 0; i<3; i++) {
            let result = sum;
            let addSubtract = this.randomNumber(0,1);
            if(addSubtract===1) {
                result += randomNumberArray[i];
                resultArray.push(result);
            } else {
                result -= randomNumberArray[i];
                resultArray.push(result);
            }
        }
       
        return resultArray;
    }

    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    playGame = () => {
        let field1 = this.randomNumber(20, 50);
        let field2 = this.randomNumber(14, 20);
        let result = field1+field2;
        let resultArray = this.generateRandomOptions(result);
        resultArray.push(result);
        resultArray.sort((a,b) => {
            return 0.5 - Math.random()
        } )
        let riddle = {
            resultArray: resultArray,
            field1: field1,
            field2: field2,
            answer: result
        }
        if(this.state && this.state.gameOver === true) {
            this.setState({
                riddle: riddle
            })
        } else 
        return riddle;
          
    }

    checkResults = (option) => {
        if(this.state.riddle.answer === option) {
            this.setState({
                correct: true,
                gameOver: true,
                
            });
        } else {
            this.setState({
                correct: false,
                gameOver: true,
                
            })
        }
    }

    renderOptions = () => {
        return (
            <div className="options">
                {this.state.riddle.resultArray.map((option, i) => 
                    <QuizOptions option = {option} key = {i} checkResults = {(option) => this.checkResults(option)}/>
                )}
            </div>
        );
    }

    play = () => {
        this.setState({
            correct: false,
            gameOver: false
        });
        this.playGame();
    }
    render() {
        return (
            <div className="quiz">
                <div className="quiz-content">
                   <p className="question">
                        What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span>
                   </p>    
                        {this.renderOptions()}
                </div>

                <div className ={classNames('after', {'hide': !this.state.gameOver}, {'wrong animated zoomInDown' : !this.state.correct}, {'correct animated zoomInDown' : this.state.correct})}>
                   <h3>
                        {this.state.correct ? this.state.correctMessage : this.state.wrongMessage + ', Correct answer is: ' + this.state.riddle.answer}   
                   </h3> 
                </div>
                {/* correct: {this.state.correct ? "true" : "false"} <br />
                game over: {this.state.gameOver ? "true" : "false"} <br /> */}
                <div className="play-again">
                    <a className="button" onClick = {this.play}>Play Again</a>
                </div>
                  
               
            </div>
        )
    }
}

export default Quiz;
                        
                       