import axios from 'axios';
import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'hello' });
});

router.get('/api/test', async (req, res) => {
  const where = {
    name: {
      _eq: 'AAA',
    },
  };
  try {
    const response = await axios.post(
      'https://myapi.yousico.com/api/rest/employees',
      { limit: 20, offset: 0 }, // Send the filter object directly, without encoding
      {
        // params: {
        //   limit: 20,
        //   offset: 0,
        // },
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5p2o6LS65rexIiwiaHR0cHM6Ly9teWFwaS55b3VzaWNvLmNvbS9ncmFwaHFsIjp7IngtaGFzdXJhLXVzZXItaWQiOiJvdV8xZWMyOWY4ZGQ2Y2NhNDBhNWFkYmVjOTI2OTRlNDkzNyIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiIsImF0dGVuZGFuY2UiLCJzdG9yZSJdfSwiaWF0IjoxNjkyMjUwMDE2fQ.H2Deyr7LmKGSyBzzJvryXWYiS_VOEatzYzeXodROFXQ',
          'Content-Type': 'application/json', // If required by the API
        },
      }
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Request error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export { router as testRouter };
