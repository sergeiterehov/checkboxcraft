import { Server } from "socket.io";
import { Field } from "./field";

const io = new Server(3000, { path: "/api" });

const field = new Field(process.env.FIELD_FILE || "field.bin");

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

    // Сохраняем состояние
    field.write(index, value, time);

    // Отправляем всем
    io.emit("write", index, value, time);
  });
});
