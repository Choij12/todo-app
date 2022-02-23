import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { Button, Label, Switch } from "@blueprintjs/core";
import { SettingsContext } from "../../context/settings/context";
import { v4 as uuid } from "uuid";

const ToDo = () => {
  const settings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(settings.numItems);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    // document.title = `To Do List: ${incomplete}`;
  }, [list]);

  useEffect(() => {
    setStartIdx(0);
    setEndIdx(settings.numItems);
  }, [settings.numItems]);

  function pagination() {
    let data = incomplete.slice(startIdx, endIdx);
    console.log("------->,", data);
    return data;
  }

  function handleNext() {
    if (endIdx <= list.length) {
      setStartIdx(startIdx + settings.numItems);
      setEndIdx(endIdx + settings.numItems);
    }
  }

  function handlePrevious() {
    if (startIdx > 0) {
      setStartIdx(startIdx - settings.numItems);
      setEndIdx(endIdx - settings.numItems);
    }
  }

  function handleHide() {
    settings.setHide(!settings.hide);
  }

  return (
    <>
      <header>
        <h1>To Do List: {incomplete.length} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <Label>
          <span>To Do Item</span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </Label>

        <Label>
          <span>Assigned To</span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </Label>

        <Label>
          <span>Difficulty</span>
          <input
            onChange={handleChange}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </Label>

        <Label>
          <Button type="submit">Add Item</Button>
        </Label>

        <Label>
          <Switch onChange={handleHide}>Hide Completed Tasks</Switch>
        </Label>
      </form>

      {pagination().map((item) => (
        <div key={item.id}>
          {settings.hide === false || item.complete === false ? (
            <section>
              <p>{item.text}</p>
              <p>
                <small>Assigned to: {item.assignee}</small>
              </p>
              <p>
                <small>Difficulty: {item.difficulty}</small>
              </p>
              <Switch onClick={() => toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </Switch>
              <hr />
            </section>
          ) : null}
        </div>
      ))}
      <Button onClick={handlePrevious}>PREVIOUS</Button>
      <Button onClick={handleNext}>NEXT</Button>
    </>
  );
};

export default ToDo;
