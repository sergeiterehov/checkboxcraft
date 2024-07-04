import { Server } from "socket.io";
import { Field } from "./field";
import { History } from "./history";

const io = new Server(3000, { path: "/api" });

const field = new Field();
const history = new History();

io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  // Первым делом отправляем все данные
  socket.emit("data", field.data.toString("base64"), field.time);

  socket.on("write", (index, value) => {
    // Проверяем типы
    if (typeof index !== "number" || typeof value !== "boolean") {
      return;
    }

    // Проверяем ограничения
    if (index < 0 || index >= field.amount) {
      return;
    }

    const time = Date.now();

    // Сохраняем историю
    history.append(index, value, time);
    // Сохраняем состояние
    field.write(index, value, time);

    // Отправляем всем
    io.emit("write", index, value, time);
  });
});
