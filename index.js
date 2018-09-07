const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const actions = require("./data/helpers/actionModel.js");
const project = require("./data/helpers/projectModel.js");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

//----Endpoints For Actions----//

//--GET ACTION--//
server.get("/action", (req, res) => {
  actions
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
server.get("/action/:id", (req, res) => {
  const id = req.params.id;
  actions
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
server.post("/action/:id", async (req, res) => {
  const action = req.body;
  actions
    .insert(action)
    .then((response) => {
      if (action.description && action.notes) {
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
    actions
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
  actions
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
//----Endpoints For Actions----//


//----Endpoints For Project----//
//--GET PROJECT--//

//--GET PROJECT--//

//--GETPROJECTACTIONS PROJECT--//

//--GETPROJECTACTIONS PROJECT--//

//--POST PROJECT--//

//--POST PROJECT--//

//--PUT PROJECT--//

//--PUT PROJECT--//

//--DELETE PROJECT--//

//--DELETE PROJECT--//
//----Endpoints For Project----//


//--START SERVER--//
server.listen(5000, () => console.log("\n=== API on port 5k ===\n"));
//--START SERVER--//