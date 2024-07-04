import { useLayoutEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { store } from "src/store";
import { FieldLine } from "src/components/FieldLine";
import { CheckboxSize } from "src/components/ui/Checkbox";
import "./Field.scss";

export const Field = observer(() => {
  const { perLine, startVisibleRow, amount } = store;
  const lines = Math.ceil(amount / perLine);

  const divRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState(300);

  const visibleAmount = Math.ceil(viewport / CheckboxSize) + 1;
  const totalHeight = lines * CheckboxSize;

  useLayoutEffect(() => {
    const div = divRef.current;

    if (!div) return;

    const update = () => {
      setViewport(parseInt(window.getComputedStyle(div).height));
    };

    update();

    const observer = new ResizeObserver(update);

    observer.observe(div);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="Field"
      onScroll={(e) => (store.startVisibleRow = Math.floor(e.currentTarget.scrollTop / CheckboxSize))}
    >
      <div style={{ height: totalHeight, width: CheckboxSize * perLine }} />
      {new Array(visibleAmount).fill(0).map((_, lineIndex) => {
        const line = lineIndex + startVisibleRow;

        if (line > lines) return null;

        const offsetHeight = startVisibleRow * CheckboxSize;
        const top = offsetHeight + lineIndex * CheckboxSize;

        return <FieldLine key={line} top={top} line={line} />;
      })}
    </div>
  );
});
