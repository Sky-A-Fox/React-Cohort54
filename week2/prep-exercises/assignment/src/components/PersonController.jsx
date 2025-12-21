// 1. Импортируем React и хуки
import React, { useState, useEffect } from 'react';
import Person from './Person';

const PersonController = () => {
  const [person, setPerson] = useState(null);

  // getPerson на уровне компонента
  const getPerson = async () => {
    try {
      const response = await fetch('https://randomuser.me/api?results=1');
      const data = await response.json();
      
      const formattedPerson = {
        firstName: data.results[0].name.first,
        lastName: data.results[0].name.last,
        email: data.results[0].email
      };
      
      setPerson(formattedPerson);
    } catch (error) {
      console.error('Error fetching person:', error);
    }
  };

  // useEffect вызывает getPerson один раз
  useEffect(() => {
    getPerson();
  }, []); // ← НЕТ комментария ESLint, пока не будет ошибки

  return <Person person={person} />;
};

// 2. Экспортируем компонент
export default PersonController;