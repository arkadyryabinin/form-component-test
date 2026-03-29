import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Данные формы:', data);
    // Здесь обычно отправка на сервер
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат email'
            }
          })}
          placeholder="Email"
        />
        {errors.email && (
          <p style={{ color: 'red' }}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов'
            }
          })}
          type="password"
          placeholder="Пароль"
        />
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}