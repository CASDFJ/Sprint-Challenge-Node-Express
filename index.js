const express = require("express");
const server = express();
const action = require("./data/helpers/actionModel.js");
const mappers = require("./data/helpers/mappers.js");
const project = require("./data/helpers/projectModel.js");
const cors = require("cors");

server.use(express.json());
server.use(cors());

//----Endpoints----//

//--GET ACTION--//
server.get("/action", (req, res) => {
  action
    .get()
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "No actions found" });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Actions cannot be found" });
    });
});
//--GET ACTION--//

//--GET with ID ACTION--//
server.get("/actions/:id", (req, res) => {
  const id = req.params.id;
  action
    .get(id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "No actions found with ID" });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Actions cannot be retrieved" });
    });
});
//--GET with ID ACTION--//

//--POST ACTION--//
server.post("/actions/:id", async (req, res) => {
  const actionBody = req.body;
  action
    .insert(actionBody)
    .then((response) => {
      if (actionBody.description && actionBody.notes) {
        res.status(201).json({ message: "Post Was Created!" });
      } else {
        res
          .status(404)
          .json({ message: "Action needs description and note(s)" });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ Error: "Action Body could not receive post" });
    });
});
//--POST ACTION--//

//--PUT ACTION--//
server.put("/action/:id", (req, res) => {
  const actionChange = req.body;
  const id = req.params.id;
  const notes = req.body.notes;
  if (notes) {
    action
      .update(id, actionChange)
      .then((change) => {
        if (change) {
          res.status(200).json(change);
        } else {
          res.status(404).json({ message: "Change(s) could not be made" });
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ message: "Error with updating post" });
      });
  } else {
    res.status(404).json({ message: "Could not find notes" });
  }
});
//--PUT ACTION--//

//--DELETE ACTION--//
server.delete("action/:id", (req, res) => {
  action
    .remove(req.params.id)
    .then((response) => {
      if (response) {
        res.status(204).json({ message: "Post Deleted!" });
      } else {
        res.status(404).json({ message: "Post with ID cannot be found" });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ message: "Post could not be removed" });
    });
});
//--DELETE ACTION--//
