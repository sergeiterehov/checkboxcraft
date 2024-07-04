import { observer } from "mobx-react-lite";
import { Pointer } from "src/components/Pointer";
import { Time } from "src/components/Time";
import { Copyright } from "src/components/Copyright";
import "./StatusBar.scss";

export const StatusBar = observer(() => {
  return (
    <p className="StatusBar">
      <Time />
      <Copyright />
      <Pointer />
    </p>
  );
});
