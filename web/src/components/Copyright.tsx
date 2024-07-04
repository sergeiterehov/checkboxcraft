import { observer } from "mobx-react-lite";

export const Copyright = observer(() => {
  return (
    <div>
      &copy;{" "}
      <a href="https://github.com/sergeiterehov" target="_blank" referrerPolicy="no-referrer">
        Терехов Сергей
      </a>
      , {new Date().getFullYear()}
    </div>
  );
});
