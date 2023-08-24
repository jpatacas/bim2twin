import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";

export const DocumentsMenu : FC = () => {

    const [{building, user}, dispatch] = useAppContext();

    if (!building || !user) {
        throw new Error("Error: building not found!");
      }

      const onUploadDocument = () => {
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
            const id = `${name}-${performance.now()}`; //id of the document
            const document = {name, id };
            newBuilding.documents.push(document);
            console.log(newBuilding)
            dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
            dispatch({
              type: "UPLOAD_DOCUMENT",
              payload: {
                document,
                file,
                building: newBuilding,
              },
            });
          }
    
          input.remove(); //cleanup
        };
    
        input.click();
      };

      const onDeleteDocument = (id: string) => {
        const newBuilding = {...building}
        const document = newBuilding.documents.find(document => document.id === id)
        if (!document) throw new Error("document not found!")
        newBuilding.documents = newBuilding.documents.filter((document) => document.id !== id)
        dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
        dispatch({type: "DELETE_DOCUMENT", payload: {document, newBuilding}})
      }

    return (
        <div>
        {building.documents.length ? (
          building.documents.map((document) => (
            <div className="list-item" key={document.id}>
              <IconButton onClick={() => onDeleteDocument(document.id)}>
                <DeleteIcon />
              </IconButton>
              <span className="margin-left">{document.name}</span>
            </div>
          ))
        ) : (
          <p>This building has no documents!</p>
        )}
        <div className="list-item">
          <Button onClick={onUploadDocument}>Upload document</Button>
        </div>
      </div>
    )
}