'use client';

import React, { useState } from 'react';
import { Button, Box, Container } from '@mui/material';
import RegisterMitraMainView from './register-mitra-main-view';
import RegisterMitraView from './register-mitra-view';

const steps = ['Register Mitra Main', 'Register Mitra Details'];

export default function RegisterMitraStepperView() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <RegisterMitraMainView />;
      case 1:
        return <RegisterMitraView />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Box sx={{ width: '100%' }}>
        <div>
          {activeStep === steps.length ? (
            <div>
              <p>All steps completed</p>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}

              {/* Render the button only if it's not the last step */}
              {activeStep < steps.length - 1 && (
                <div className='w-full md:w-[50%] mx-auto items-center mt-10'>
                  <Button
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    onClick={handleNext}
                    style={{
                      backgroundColor: '#f99932',
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 600,
                    }}>
                    Daftar menjadi Mitra
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
}
