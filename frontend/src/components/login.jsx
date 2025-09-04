import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register("username", { required: true })}
        />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
