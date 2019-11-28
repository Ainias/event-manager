"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_helper_1 = require("js-helper");
class EventManager {
    constructor() {
        this._listeners = {};
        this._lastListenerId = 0;
    }
    /**
     * @return {EventManager}
     */
    static getInstance() {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }
    addListener(event, listener) {
        if (typeof listener !== "function") {
            throw new Error("can only add functions as listeners!");
        }
        this._lastListenerId++;
        if (!this._listeners[event]) {
            this._listeners[event] = {};
            this._listeners[event][this._lastListenerId] = listener;
        }
        return this._lastListenerId;
    }
    removeListener(event, listenerId) {
        if (this._listeners[event] && this._listeners[event][listenerId]) {
            delete this._listeners[event][listenerId];
        }
    }
    trigger(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._listeners[event]) {
                yield js_helper_1.Helper.asyncForEach(Object.keys(this._listeners[event]), (listenerId) => __awaiter(this, void 0, void 0, function* () {
                    yield this._listeners[event][listenerId](data);
                }), true);
            }
        });
    }
    static trigger(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getInstance().trigger(event, data);
        });
    }
}
exports.EventManager = EventManager;
EventManager._instance = null;
