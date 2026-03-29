import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ----- СХЕМА ВАЛИДАЦИИ ДЛЯ ZOD 4 -----
const depositSchema = z
  .object({
    bankName: z.string().min(1, "Название банка обязательно"),
    startDate: z.string().min(1, "Дата открытия обязательна"),
    endDate: z.string().min(1, "Дата закрытия обязательна"),
    amount: z
      .number()
      .min(1000, "Минимальная сумма вклада — 1 000 ₽")
      .positive("Сумма должна быть больше 0"),
    interestRate: z
      .number()
      .min(0.01, "Ставка должна быть больше 0")
      .max(30, "Ставка не может превышать 30%"),
    autoRenewal: z.enum(["yes", "no"]),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "Дата закрытия должна быть позже даты открытия",
      path: ["endDate"],
    }
  );

type DepositFormData = z.infer<typeof depositSchema>;

export const DepositForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      bankName: "",
      startDate: "",
      endDate: "",
      autoRenewal: "no",
    },
  });

  const onSubmit = async (data: DepositFormData) => {
    console.log("Данные вклада:", data);
    alert("Вклад успешно зарегистрирован");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2>Регистрация банковского вклада</h2>

      {/* НАЗВАНИЕ БАНКА */}
      <div style={fieldStyle}>
        <label>Название банка</label>
        <input
          {...register("bankName")}
          placeholder="Пример: Тинькофф, Сбер"
          style={inputStyle}
        />
        {errors.bankName && (
          <span style={errorStyle}>{errors.bankName.message}</span>
        )}
      </div>

      {/* ДАТА ОТКРЫТИЯ */}
      <div style={fieldStyle}>
        <label>Дата открытия вклада</label>
        <input type="date" {...register("startDate")} style={inputStyle} />
        {errors.startDate && (
          <span style={errorStyle}>{errors.startDate.message}</span>
        )}
      </div>

      {/* ДАТА ЗАКРЫТИЯ */}
      <div style={fieldStyle}>
        <label>Дата закрытия вклада</label>
        <input type="date" {...register("endDate")} style={inputStyle} />
        {errors.endDate && (
          <span style={errorStyle}>{errors.endDate.message}</span>
        )}
      </div>

      {/* СУММА ВКЛАДА */}
      <div style={fieldStyle}>
        <label>Сумма вклада (₽)</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          placeholder="10000"
          style={inputStyle}
        />
        {errors.amount && (
          <span style={errorStyle}>{errors.amount.message}</span>
        )}
      </div>

      {/* СТАВКА % */}
      <div style={fieldStyle}>
        <label>Ставка (% годовых)</label>
        <input
          type="number"
          step="0.1"
          {...register("interestRate", { valueAsNumber: true })}
          placeholder="5.5"
          style={inputStyle}
        />
        {errors.interestRate && (
          <span style={errorStyle}>{errors.interestRate.message}</span>
        )}
      </div>

      {/* АВТОПРОЛОНГАЦИЯ */}
      <div style={fieldStyle}>
        <label>Автопролонгация</label>
        <div style={{ display: "flex", gap: "1rem" }}>
          <label>
            <input type="radio" value="yes" {...register("autoRenewal")} />
            Да
          </label>
          <label>
            <input type="radio" value="no" {...register("autoRenewal")} />
            Нет
          </label>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} style={buttonStyle}>
        {isSubmitting ? "Сохранение..." : "Зарегистрировать вклад"}
      </button>
    </form>
  );
};

// Стили (без изменений)
const formStyle: React.CSSProperties = {
  maxWidth: 500,
  margin: "2rem auto",
  padding: "2rem",
  border: "1px solid #ccc",
  borderRadius: 12,
  background: "#fff",
  fontFamily: "sans-serif",
};

const fieldStyle: React.CSSProperties = {
  marginBottom: "1.2rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  border: "1px solid #aaa",
  borderRadius: 6,
  fontSize: "1rem",
};

const errorStyle: React.CSSProperties = {
  color: "#d32f2f",
  fontSize: "0.8rem",
  display: "block",
  marginTop: "0.25rem",
};

const buttonStyle: React.CSSProperties = {
  background: "#1976d2",
  color: "#fff",
  padding: "0.6rem 1.2rem",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: "1rem",
};