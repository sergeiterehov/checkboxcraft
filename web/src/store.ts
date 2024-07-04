import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";

export enum ConnectionStatus {
  Waiting = "waiting",
  Connected = "connected",
}

class Store {
  readonly amount = 1000000;
  readonly perLine = 64;

  private _io: Socket;
  private _connectionStatus = ConnectionStatus.Waiting;

  get connectionStatus() {
    return this._connectionStatus;
  }

  private _random: number = 0;

  get random() {
    return this._random;
  }

  private _startVisibleRow = 0;

  get startVisibleRow() {
    return this._startVisibleRow;
  }

  set startVisibleRow(value: typeof this._startVisibleRow) {
    this._startVisibleRow = value;
  }

  readonly field = new Array(this.amount).fill(0);
  private _time = 0;

  get time() {
    return this._time;
  }

  constructor() {
    makeAutoObservable(this);

    this._io = io("", { path: "/api" });

    this._io.on("connection", this._handleIoOpen);
    this._io.on("error", this._handleIoError);

    this._io.on("write", this._handleWrite);
    this._io.on("data", this._handleData);
  }

  randomize() {
    this._random = Math.random();
  }

  write(index: number, value: boolean) {
    this._io.emit("write", index, value);
  }

  getLine(line: number) {
    const bits: boolean[] = [];

    for (let i = line * this.perLine, iEnd = i + this.perLine; i < iEnd; i += 1) {
      const byteIndex = Math.floor(i / 8);
      const bitIndex = i % 8;
      const prev = this.field[byteIndex];

      bits.push(Boolean(prev & (1 << bitIndex)));
    }

    return bits;
  }

  private _writeToField(index: number, value: boolean) {
    const byteIndex = Math.floor(index / 8);
    const bitIndex = index % 8;
    const prev = this.field[byteIndex];
    const next = value ? prev | (1 << bitIndex) : prev & ~(1 << bitIndex);

    this.field[byteIndex] = next;
  }

  private _handleIoOpen = () => {
    this._connectionStatus = ConnectionStatus.Connected;
  };

  private _handleIoError = () => {
    this._connectionStatus = ConnectionStatus.Waiting;
  };

  private _handleWrite = (index: number, value: boolean, time: number) => {
    this._writeToField(index, value);

    this._time = time;
  };

  private _handleData = (data: string, time: number) => {
    const binaryString = atob(data);

    for (var i = 0; i < binaryString.length; i++) {
      this.field[i] = binaryString.charCodeAt(i);
    }

    this._time = time;
  };
}

export const store = new Store();
