import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { IToastMessages } from '../../hooks/toast';
import { Container } from './styles';

interface IToastContainerProps {
  messages: IToastMessages[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {messagesWithTransitions((props, item) => (
        <Toast key={item.id} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
