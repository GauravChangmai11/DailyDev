import { atom, atomFamily, selector, selectorFamily } from "recoil";
import axios from 'axios'
import Todo from "../../components/Todos";
import { TodosList } from "../../constants/Todos";

export const chatsAtom = atom({
    key:"chatsAtom",
    default:5
})

export const networkAtom = atom({
    key:"networkAtom",
    default:3
})

export const teamAtom = atom({
    key:'teamAtom',
    default:8
})

export const totalMessages = selector({
    key:"totalSelector",
    get: ({get})=>{
        const chats = get(chatsAtom)
        const network = get(networkAtom)
        const teams = get(teamAtom)
        return chats + network + teams
    }
})

export const filesAtom = atom({
    key:"filesAtom",
    default:{
        chats:3,
        network: 4, 
        teams: 9
    }
})

export const filesSelector = selector({
    key:"filesSelector",
    get: ({get})=>{
        const files = get(filesAtom)
        return files.chats + files.network + files.teams
    }
})

export const fetchDataAtom = atom({
    key:"fetchDataAtom",
    default:selector({
        key:"fetchDataAtomSelector",
        get: async ()=>{
            const res = await axios.get("https://daily-dev-gaurav-changmais-projects.vercel.app/sendJson?username=username&password=password")
            console.log("res ",res.data);
            return res.data
        }
    })
})

export const TodoFamily = atomFamily({
    key:"todoFamily",
    default: (id) =>{ 
        return TodosList.find(item =>item.key==id)
    }
})

export const fetchTodoFamily = atomFamily({
    key:'fetchTodoFamily',
    default: selectorFamily({
        key: 'fetchTodoSelectorFamily',
        get: (id)=>async ({get})=>{
            const res = await axios.get(`https://daily-dev-gaurav-changmais-projects.vercel.app/getTodo?id=${id}&username=username&password=password`)
            return res.data.data[0]
        }
    })
})