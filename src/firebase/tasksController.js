import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from ".";

export const addTask = (task) => {
  return addDoc(collection(db, "task"), task);
};

export const getTasks = async () => {
  const querySnapShot = await getDocs(collection(db, "task"));
  const tasks = querySnapShot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return tasks;
};

export const updateTask = (task) => {
  return setDoc(doc(db, "task", task.id), {
    ...task,
    completed: !task.completed,
  });
};
