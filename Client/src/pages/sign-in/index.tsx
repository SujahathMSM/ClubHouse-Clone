import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../App.css";
interface FormValues {
  username: string;
  name: string;
}

export const SignIn = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username")
      .required("User Name is required"),
    name: yup.string().required("Name is required"),
  });

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    const { username, name } = data;
    console.log(username, name);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  return (
    <div className="home">
      <h1>Welcome to Sujahath's Audio Chat App</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>User Name: </label>
          <input type="text" {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label>Name: </label>
          <input type="text" {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
