import { useState } from 'react';
import Section from '../Section';
import FeedbackOptions from '../FeedbackOptions';
import Statistics from '../Statistics';
import Notification from '../Notification';

import { AppContainer } from './App.styled';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;

  const positivePercentage = totalFeedback ? (good / totalFeedback) * 100 : 0;

  const feedbackClickHadler = type => {
    switch (type) {
      case 'good':
        setGood(prev => prev + 1);
        return;

      case 'bad':
        setBad(prev => prev + 1);
        return;

      case 'neutral':
        setNeutral(prev => prev + 1);
        return;

      default:
        throw new Error(`Unknown type of feedback: ${type}`);
    }
  };

  return (
    <AppContainer>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={feedbackClickHadler}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback yet..." />
        )}
      </Section>
    </AppContainer>
  );
}
