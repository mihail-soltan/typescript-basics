import { useState, useEffect } from "react";
import {
  getCategories,
  addNewCategory,
  getCategoriesByUser,
} from "../../services/category.service";
import "./Category.css";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { exportData } from "../../services/task.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { EditOrDeleteCategory } from "../EditOrDeleteCategory/EditOrDeleteCategory";
import { CategoryType } from "../../types/category";

export function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  async function onGetCategories() {
    const cached = localStorage.getItem("user") 
    if(cached){
      const user = JSON.parse(cached)
      const response = await getCategoriesByUser(user._id);
      setCategories(response);
    }
  }
  function handleChange(e:any) {
    setNewCategory(e.target.value);
  }

  async function onAddCategory() {
    const cached = localStorage.getItem("user") 
    if (cached) {
      const user = JSON.parse(cached)
      const body = { name: newCategory, created_by: user._id };
      const response = await addNewCategory(body);
      setCategories([]);
      onGetCategories();
      setNewCategory("");
      return response;
    }
  }

  function closeModal() {
    setShow(false);
  }

  useEffect(() => {
    const cached = localStorage.getItem("user") 
    if (cached) {
      onGetCategories();
    }
  }, []);

  return (
    <div className="category-container">
      <InputGroup className="mb-3 w-50">
        <InputGroup.Text id="inputGroup-sizing-default">
          New Category
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={handleChange}
          value={newCategory}
        />
        <Button onClick={onAddCategory} variant="success">
          Add
        </Button>{" "}
      </InputGroup>
      {/* categories.length? fa asta : fa altceva */}
      <ListGroup defaultActiveKey="#link1">
        {categories.length ? (
          categories.map((category) => (
            <>
              <EditOrDeleteCategory
                show={show}
                category={category}
                closeModal={closeModal}
              />
              <ListGroup.Item
                action
                onClick={() => setShow(true)}
                key={Math.floor(Math.random()*100000000000)}
              >
                {category.name}
              </ListGroup.Item>{" "}
            </>
          ))
        ) : (
          <Spinner animation="border" role="status" variant="warning">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </ListGroup>
    </div>
  );
}
