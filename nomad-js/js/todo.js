const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY="todos";

let toDos = [];
/* 계속해서 업데이트 되는 배열이기 때문에 상수인 const가 아닌 let을 사용 */

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
/* 로컬스토리지에 Item으로 저장, JSON.stringify는 그대로 저장 가능. 배열이면 배열을 문자열이 아닌 배열로 저장 */


function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    /* li.remove는 어떤 li를 삭제했는지 알 수 없기 때문에 .filter를 통해 id값을 찾아 !==으로 비교해서 어떤 id를 가진 li를 삭제했는지 알 수 있음 */
    /* parseInt를 사용한 이유는 toDo.id는 정수인데 li.id는 문자열, 비교가 불가능하기 때문*/
    saveToDos();/* 삭제한 배열을 다시 로컬스토리지에 저장 */
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    /* li 태그를 만듬 */
    li.id = newTodo.id;
    const span = document.createElement("span");
    /* span 태그를 만듬 */
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    /* button 태그를 만듬 */
    button.innerText = "X";
    button.addEventListener("click", deleteToDo);
    /* click하면 deleteToDo함수를 호출 */
    li.appendChild(span);
    li.appendChild(button);
    /* li태그안에 span과 button을 삽입 */
    toDoList.appendChild(li);
    /* toDoList라는 id를 가진 ul에 li태그를 삽입 */
}

function handleToDoSubmit(event){
    event.preventDefault();
    /* 엔터입력시 새로고침되는 default값을 막음 */
    const newTodo = toDoInput.value;
    /* newTodo라는 상수에 Input되는 값을 저장 */
    toDoInput.value = "";
    /* Input값을 공백으로 초기화 */
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    /* Input되는 값을 객체로 받음 text에 newTodo을 넣어 값을 저장하고 id는 실시간 값을 넣어 구분 어떤 li인지 구분하기 위해 id를 생성 */
    toDos.push(newTodoObj);
    /* toDos 배열에 위의 newTodoObj를 삽입 */
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
/* submit 이벤트리스너를 추가, submit이 발생할 때 handleToDoSubmit 함수를 호출 */

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}