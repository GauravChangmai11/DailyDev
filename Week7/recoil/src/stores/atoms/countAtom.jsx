import {atom, selector} from 'recoil'

export const countAtom = atom({
    key: 'countAtom',
    default: 5
}) 

export const isEvenCount = selector({
    key: 'countSelector',
    get: (props)=>{
        const count = props.get(countAtom)
        return count % 2 == 0
    }
})