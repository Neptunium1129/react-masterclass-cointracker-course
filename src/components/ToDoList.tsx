import React, { useState } from "react";

//여기서는 리액트 훅 폼을 배운다.
import {useForm} from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


 /*    function ToDoList(){
        const [toDo, setTodo] = useState("");
        const [toDoErr, setTodoErr] = useState("");

        const onChg = (event:React.FormEvent<HTMLInputElement>) => {
            const {
                currentTarget: {value},
            } = event;
            setTodoErr("");
            setTodo(value);
        }

        const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(toDo);
            if(toDo.length > 10){
                return setTodoErr("너무 깁니다.");
            }
            console.log("submit");
        }

        return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChg} value={toDo} placeholder="write to do..." ></input>
                <button>추가</button>
                {toDoErr !== "" ? toDoErr : null}
            </form>
        </div>
        )
    } */

/* interface IForm {
    email?:string;
    userId?:string;
    userName:string;
    password:string;
    password1:string;
    ip:string;
    extraError?:string;
} */

/* function ToDoList(){
    const { register, watch, handleSubmit, formState:{errors}, setError } = useForm<IForm>({
        defaultValues : {
            email : "@naver.com"
        }
    }); 

    //데이터가 유효할때
    const onValid = (data: IForm) => {
        console.log(data);
        if(data.password !==data.password1){
            setError(
              "password1",
              { message: "pass를 제대로 치세요" },
              { shouldFocus: true }
            );
        }

        // if(data.userId == "tmdals"){
        //     setError(
        //         "userId",
        //         { message: `${data.userId}은 사용 할 수 없습니다.` },
        //         { shouldFocus: true }
        //       );   
        // }
        
        //setError("extraError", {message : "server is busy..."});

    };
    //레지스터 함수
    //console.log(register("toDo"));
    console.log("watch", watch());
    console.log("formState", errors);

    //     /^[A-Za-z0-9._%+-]+@naver.com$/

    // ^ :문장의 시작
    // [] : 문자셋 안의 아무문자
    // + : 하나 또는 많이

    return (
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onValid)}
        >
          <input
            {...register("email", {
              required: "email is req ! ",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: "only naver.com",
              },
            })}
            placeholder="write to do..."
          ></input>
          <span>{errors?.email?.message}</span>

          <input
            {...register("userId", { required: "5이상", minLength: 5 })}
            placeholder="ID"
          ></input>
          <span>{errors?.userId?.message}</span>
          <input
            {...register("userName", {
              required: "no",
              validate: {
                noTmdlas : (value) =>
                value.includes("tmdals") ? "no tmdals!" : true,
                noTmdals1 : (value) =>
                value.includes("test") ? "no test!" : true,
              }
            })}
            placeholder="username"
          ></input>
          <span>{errors?.userName?.message}</span>

          <input {...register("password")} placeholder="pass"></input>
          <input
            {...register("password1", { required: "pass is req" })}
            placeholder="pass1"
          ></input>
          <span>{errors?.password1?.message}</span>

          <input {...register("ip")} placeholder="Ip"></input>

          <button>추가</button>
          <span>{errors?.extraError?.message}</span>
        </form>
      </div>
    );
} */


interface IForm {
    toDo : string;
}


function ToDoList(){
    //const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    //alert(event.currentTarget.value);
    setCategory(event.currentTarget.value as any);
  }
    //console.log("selectorOutput", selectorOutput);
    console.log("category", category);
    console.log("toDos", toDos);
    

    return (
        <div>
        <h1>To Dos</h1>
        <hr />
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
          { toDos?.map( (todo) => ( <ToDo key={todo.id} {...todo} /> )) }
        </div>
    )
}

export default ToDoList;