import React, { Component } from 'react';
import QuizOptions from './QuizOptions';
import { of } from 'rxjs';

class Quiz extends Component {
    constructor(props) {
        super(props);
        let riddle = this.playGame();
        this.state = {riddle}
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
        return riddle;
          
    }
    renderOptions = () => {
        return (
            <div className="options">
                {this.state.riddle.resultArray.map((option, i) => 
                    <QuizOptions option = {option} key = {i}/>
                )}
            </div>
        );
    }
    render() {
        return (
            <div className="quiz">
                <div className="quiz-content">
                   <p className="question">
                        What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span>
                   </p>    
                        {this.renderOptions()}
                        <div className="play-again">
                            <a className="button">Play Again</a>
                        </div>
                  
                </div>
            </div>
        )
    }
}

export default Quiz;
                        
                       