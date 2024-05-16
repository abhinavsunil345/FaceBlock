import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MessageBoard from './MessageBoard';

function Login(props) {
    return (
        <div className="App">
        <div className="container mt-4">
           <div class="row align-items-center col-12">
            <div class="col-3">
            </div>
            <div class="col-6">
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Link to="/MessageBoard">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Link>
      </Form>
      </div>
      <div class="col-3">
            </div>
      </div>
      </div>
      </div>
    );
  }
  
  export default Login;
