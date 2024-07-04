import { observer } from "mobx-react-lite";
import { store } from "src/store";

export const Pointer = observer(() => {
  return (
    <div className="Pointer">
      {store.startVisibleRow * store.perLine} / {store.amount}
    </div>
  );
});
