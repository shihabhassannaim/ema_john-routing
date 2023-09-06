import React from 'react';
import { useForm } from 'react-hook-form';
import './shipment.css';

const Shipment = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
  
    return (
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <select {...register("gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <input type="submit" />
      </form>
    )
};

export default Shipment;