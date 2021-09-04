import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../hooks/hooks";

import "../App.css";

const Register = (props) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const values = {
      username: "",
      email: "",
      password: "",
    };
  });

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: token }) {
      context.login(token);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 style={{ marginTop: 20, textAlign: "center" }}>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="123@abc.com"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <p>
            An error ocurred, please pick a different username or make sure all
            fields are not empty
          </p>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      credentials: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

export default Register;
