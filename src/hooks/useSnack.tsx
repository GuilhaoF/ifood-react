import { useContext } from "react";
import { SnackContext } from "../contexts/SnackContext";

//hook personalizado que consome o context
export function useSnack(){
    return useContext(SnackContext)
}