import { useForm, SubmitHandler } from 'react-hook-form';

// Определяем тип данных формы
type FormData = {
  username: string;
  email: string;
  age: number;
};

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>(); // 👈 передаём тип

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // data полностью типизирован как FormData
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      <input {...register('email')} />
      <input {...register('age', { valueAsNumber: true })} />
      <button type='submit'>Submit</button>
    </form>
  );
}