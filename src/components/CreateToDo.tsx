import {useForm} from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";


interface IForm {
    toDo : string;
}

function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValue = ({toDo}: IForm) => {
        setToDos((oldToDos) => [{text : toDo, id :Date.now(), category : category }, ...oldToDos]);
    }

    return (
        <>
        <form onSubmit={handleSubmit(handleValue)}  >
            <input {...register("toDo", {required : true})} placeholder="write to do..."></input>
            <button >추가</button>
        </form>
        </>
    );
}

export default CreateToDo;