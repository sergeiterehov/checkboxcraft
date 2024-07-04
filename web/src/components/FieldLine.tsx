import { observer } from "mobx-react-lite";
import { store } from "src/store";
import { Checkbox } from "src/components/ui/Checkbox";

export const FieldLine = observer<{ line: number; top: number }>((props) => {
  const { line, top } = props;

  const data = store.getLine(line);

  if (data === undefined) {
    return null;
  }

  return (
    <div className="Field-line" style={{ left: 0, top }}>
      {new Array(store.perLine).fill(0).map((_, inLineIndex) => {
        const index = line * store.perLine + inLineIndex;

        if (index >= store.amount) return null;

        return (
          <Checkbox key={inLineIndex} checked={data[inLineIndex]} onChange={(value) => store.write(index, value)} />
        );
      })}
    </div>
  );
});
