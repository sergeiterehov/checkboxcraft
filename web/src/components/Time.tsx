import { observer } from "mobx-react-lite";
import { store } from "src/store";

export const Time = observer(() => {
  return <div className="Time">Обновлено: {store.time ? new Date(store.time).toLocaleString() : "неизвестно"}</div>;
});
