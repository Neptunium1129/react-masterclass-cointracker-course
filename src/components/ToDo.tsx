import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";


function ToDo({...ToDo}:IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (newCategory : IToDo["category"]) => {
        console.log(newCategory);

        setToDos(oldToDos => {
            console.log(oldToDos.findIndex(_toDo => _toDo.id === ToDo.id));
            const index = oldToDos.findIndex(_toDo => _toDo.id === ToDo.id);
            const oldToDo = oldToDos[index];
            //const newToDo =  { id, text, category : newCategory};
            const newToDo = {
              text: ToDo.text,
              id: ToDo.id,
              category: newCategory,
              //as any도 가능하지만 비선호..
            };

           // console.log("oldToDo",oldToDo);
           // console.log("newToDo",newToDo);
           if(newCategory === Categories.DELETE){
                return [
                    ...oldToDos.slice(0, index),
                    ...oldToDos.slice(index + 1),
                    ];
           }else{
                return [
                ...oldToDos.slice(0, index),
                newToDo,
                ...oldToDos.slice(index + 1),
                ];
           }
        })

    };
    return (
      <li>
        <span>
          {ToDo.text} / {ToDo.category} : {ToDo.id}
        </span>
        {ToDo.category !== Categories.TO_DO && (
          <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
        )}
        {ToDo.category !== Categories.DONE && (
          <button onClick={() => onClick(Categories.DONE)}>Done</button>
        )}
        {ToDo.category !== Categories.DOING && (
          <button onClick={() => onClick(Categories.DOING)}>Doing</button>
        )}
        {(
          <button onClick={() => onClick(Categories.DELETE)}>DELETE</button>
        )}
      </li>
    );
}

export default ToDo;