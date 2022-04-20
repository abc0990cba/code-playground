import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TypeDispatch } from "../redux/store"
import { RootState } from "../redux/reducers";

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypeDispatch = () => useDispatch<TypeDispatch>();