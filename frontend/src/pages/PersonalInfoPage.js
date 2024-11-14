// PersonalInfoPage.js

import React from 'react';
import { Button } from 'react-bootstrap';
import PersonalInfo from '../components/PersonalInfo';

const PersonalInfoPage = ({ onNext }) => {
  return (
    <div>
      <h2>Information du Client</h2>
      <PersonalInfo />
      <Button variant="primary" onClick={onNext}>
        Suivant
      </Button>
    </div>
  );
};

export default PersonalInfoPage;
