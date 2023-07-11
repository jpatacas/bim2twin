import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-context.css";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear";

export const ModelListMenu: FC = () => {
  const [{ building, user }, dispatch] = useAppContext();

  if (!building || !user) {
    throw new Error("Error: building not found!");
  }

  const onUploadModel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);

    input.onchange = () => {
      console.log(input.files);

      if (input.files && input.files.length) {
        const file = input.files[0]; //just get the first file
        const newBuilding = { ...building }; //copy of the building object
        const { name } = file;
        const id = `${name}-${performance.now()}`; //id of the model
        const model = {name, id };
        newBuilding.models.push(model);
        console.log(newBuilding)
        dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
        dispatch({
          type: "UPLOAD_MODEL",
          payload: {
            model,
            file,
            building: newBuilding,
          },
        });
      }

      input.remove(); //cleanup
    };

    input.click();
  };

  const onDeleteModel = (id: string) => {
    const newBuilding = {...building}
    const model = newBuilding.models.find(model => model.id === id)
    if (!model) throw new Error("Model not found!")
    newBuilding.models = newBuilding.models.filter((model) => model.id !== id)
    dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
    dispatch({type: "DELETE_MODEL", payload: {model, newBuilding}})
  }

  return (
    <div>
      {building.models.length ? (
        building.models.map((model) => (
          <div className="list-item" key={model.id}>
            <IconButton onClick={() => onDeleteModel(model.id)}>
              <DeleteIcon />
            </IconButton>
            <span className="margin-left">{model.name}</span>
          </div>
        ))
      ) : (
        <p>This building has no models!</p>
      )}
      <div className="list-item">
        <Button onClick={onUploadModel}>Upload model</Button>
      </div>
    </div>
  );
};
