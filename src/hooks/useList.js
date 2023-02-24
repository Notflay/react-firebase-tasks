import { useState } from "react";

const useList = (initialValue = []) => {
  const [value, setValue] = useState(initialValue);

  // Push new value to list
  const push = (element) => {
    setValue((oldValue) => [...oldValue, { task: element, completed: false }]);
  };

  // Remove value from list
  const remove = (index) => {
    setValue((oldValue) => oldValue.filter((_, i) => i !== index));
  };

  // Cambia el estado de la tarea
  const change = (index) => {
    const list = [...value];
    list[index].completed = !list[index].completed;
    console.log(list);
    setValue(list);
  };

  // List is Empty ? true / false
  const isEmpty = () => value.length === 0;

  function clear() {
    setValue([]);
  }

  function orden() {
    setValue([...value].sort());
  }

  function invert() {
    setValue([...value].reverse());
  }

  // TODO:Develop more functions for lists

  return {
    value,
    setValue,
    push,
    remove,
    isEmpty,
    clear,
    orden,
    change,
    invert,
  };
};

export default useList;
