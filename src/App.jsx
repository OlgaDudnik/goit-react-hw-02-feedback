import React, { Component } from 'react';
import Statistics from 'components/Statistics';
import Notification from 'components/Notification';
import Section from 'components/Section';
import FeedbackOptions from 'components/FeedbackOptions';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = name => {
    this.setState(prev => {
      return { [name]: prev[name] + 1 };
    });
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.floor((good / this.countTotalFeedback()) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleIncrement}
          ></FeedbackOptions>
        </Section>

        <Section title="Statistics">
          {!this.countTotalFeedback() ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              percent={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}
export default App;
