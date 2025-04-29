import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import { chatsAtom, fetchDataAtom, fetchTodoFamily, filesAtom, filesSelector, networkAtom, teamAtom, TodoFamily } from "../stores/atoms/todoAtom";


export default function Todo(){
    const chatCount = useRecoilValue(chatsAtom)
    const networkCount = useRecoilValue(networkAtom)
    const teamCount = useRecoilValue(teamAtom)
    const totalCount = useRecoilValue(teamAtom)
    const filesCount = useRecoilValue(filesAtom)
    const filesTotal = useRecoilValue(filesSelector)
    const fetchedData = useRecoilValue(fetchDataAtom)
    const familyTodo1 = useRecoilValue(TodoFamily(1))
    const fetchFamilyTodo2 = useRecoilValue(fetchTodoFamily(2))
    const [fetchFamilyTodo3, setFetchFamilyTodo3] = useRecoilStateLoadable(fetchTodoFamily(3))

    return(
        <>
            <div>
                <div>Messages</div>
                <button>Chats ({chatCount})</button>
                <button>Network ({networkCount})</button>
                <button>Team ({teamCount})</button>
                <button>Me ({totalCount})</button>
            </div>
            <div>
                <div>Files</div>
                <button>Chats ({filesCount.chats})</button>
                <button>Network ({filesCount.network})</button>
                <button>Team ({filesCount.teams})</button>
                <button>Me ({filesTotal})</button>
            </div>
            <div>
                <div>{fetchedData.name} and total request count is {fetchedData.requestCount}</div>
            </div>
            <div>
                <div>{familyTodo1.title}, {familyTodo1.description}</div>
            </div>
            <div>
                <div>{fetchFamilyTodo2.title}, {fetchFamilyTodo2.desc}</div>
            </div>
            {fetchFamilyTodo3.state == "loading" && 
                <div>Loading....</div>
            }
            {fetchFamilyTodo3.state === "hasValue" && 
                <div>{fetchFamilyTodo3.contents.title}, {fetchFamilyTodo3.contents.desc}</div>
            }
            {fetchFamilyTodo3.state === "hasError" && 
                <div>Oops!! Ran into an error.</div>
            }
        </>
    )
}