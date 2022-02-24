import React, { useEffect, useState, useContext } from "react";
import { Button, Label, Switch, Card, Elevation } from "@blueprintjs/core";
import { SettingsContext } from "../../context/settings/context";
import { v4 as uuid } from "uuid";
import "./todo.scss";

const ToDo = () => {
  const settings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(settings.numItems);
  const [itemName, setItem] = useState("");
  const [assignee, setAssignee] = useState("");
  const [difficulty, setDifficulty] = useState(3);

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      id: uuid(),
      text: itemName,
      complete: false,
      assignee: assignee,
      difficulty: difficulty,
    };
    setList([...list, item]);
  }
  function deleteItem(id) {
    console.log(id);
    const items = list.filter((itemA) => itemA.id !== id);
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
  }, [list]);

  useEffect(() => {
    setStartIdx(0);
    setEndIdx(settings.numItems);
  }, [settings.numItems]);

  function pagination() {
    let data;
    if (settings.hide) {
      data = incomplete.slice(startIdx, endIdx);
    } else {
      data = list.slice(startIdx, endIdx);
    }
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
  function handleItem(e) {
    let { value } = e.target;
    setItem(value);
  }
  function handleAssignee(e) {
    let { value } = e.target;
    setAssignee(value);
  }
  function handleDifficulty(e) {
    let { value } = e.target;
    setDifficulty(value);
  }
  function handleShowNumItems(e) {
    let { value } = e.target;
    settings.setNumItems(value);
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
            onChange={handleItem}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </Label>

        <Label>
          <span>Assigned To</span>
          <input
            onChange={handleAssignee}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </Label>

        <Label>
          <span>Difficulty</span>
          <input
            onChange={handleDifficulty}
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
        <Label>
          <span>Number of items</span>
          <input
            onChange={handleShowNumItems}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="showNumItems"
          />
        </Label>
        <Button onClick={handlePrevious}>PREVIOUS</Button>
        <Button onClick={handleNext}>NEXT</Button>
      </form>

      {pagination().map((item) => (
        <Card
          className="cards"
          key={item.id}
          interactive={true}
          elevation={Elevation.TWO}
        >
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
              <Button onClick={() => deleteItem(item.id)}>Delete</Button>
            </section>
          ) : null}
        </Card>
      ))}
    </>
  );
};

export default ToDo;