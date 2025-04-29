import {useRecoilValue } from "recoil";
import { countAtom, isEvenCount } from "../stores/atoms/countAtom";

export default function Count() {
  console.log("re-rendering count UI !!");
  const count=useRecoilValue(countAtom)
  return (
    <>
      <div>Count is {count}</div>
    </>
  );
}
