import React from 'react'
import { useRecoilValue } from 'recoil'
import { countAtom, isEvenCount } from '../stores/atoms/countAtom'

export const EvenOdd = () => {
    const isCountEven = useRecoilValue(isEvenCount)
    console.log("re-rendered Even Odd");
  return (
    <div>
        {
            (isCountEven) ?<div>Number is Even</div>:<div>Number is Odd</div>
        }
    </div>
  )
}
