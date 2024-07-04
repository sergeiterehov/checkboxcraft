import { observer } from "mobx-react-lite";
import { Field } from "src/components/Field";
import { StatusBar } from "src/components/StatusBar";
import "./App.scss";

export const App = observer(() => {
  return (
    <>
      <h1>CheckBoxCraft</h1>
      <p>Это открытое пространство для творчества. Меняй крыжики: их увидят все.</p>
      <Field />
      <StatusBar />
    </>
  );
});
