import Api from "../services/api";
import {call, put, takeEvery} from "redux-saga/effects";
import Token from "../services/token";
import Handle from '../services/handle';

const LIMIT = {
    limit: 10
};
