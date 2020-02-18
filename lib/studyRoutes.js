const express = require('express');
const passport = require('passport');
const shortid = require('shortid');

const router = express.Router();
const mongoose = require('mongoose');

const Project = mongoose.model('project');

router.post('/create', async (req, res) => {
  const { name } = req.body;
  const invitetoken = shortid.generate();
  const study = await new Project({
    name,
    manager: req.user._id,
    invitetoken,
  }).save();
  return res.status(200).send(study);
});

router.get('/getmystudies', async (req, res) => {
  const studies = await Project.find({ manager: req.user._id }).sort({
    createdAt: -1,
  });
  res.send(studies);
});

router.delete('/del/:id', async (req, res) => {
  console.log('req to delete', req.params.id);
  const { project } = await Project.deleteOne({
    _id: req.params.id,
    manager: req.user._id,
  });
  res.send(project);
});

router.get('/getstudy/:id', async (req, res) => {
  const study = await Project.getUsers({
    _id: req.params.id,
    manager: req.user._id,
  });
  res.send(study);
});

router.get('/getname/:invitetoken', async (req, res) => {
  const [study] = await Project.find(
    {
      invitetoken: req.params.invitetoken,
    },
    { name: 1 }
  );
  res.send(study);
});

module.exports = router;
