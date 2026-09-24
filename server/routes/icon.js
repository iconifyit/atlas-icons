const express = require("express");
var multiparty = require('multiparty');
const { Icon } = require("../models/icon");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { Category } = require("../models/category");
const auth = require("../middleware/auth");

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
const TEMP_DIR = path.join(__dirname, process.env.TEMP_DIR);

router.post("/upload-icons", auth, async (req, res, next) => {
  let form = new multiparty.Form({ uploadDir: TEMP_DIR, autoFiles: false });
  form.parse(req, async function (err, fields, files) {
    let _icons = files.icons.filter(icon => {
      // icon.filename = icon.path.slice(icon.path.lastIndexOf("\\") + 1)
      icon.filename = icon.path.slice(icon.path.lastIndexOf("/") + 1)
      return icon
    })
    res.status(200).send(_icons)
  });

  form.on('error', function (err) {
    res.status(500).send(err);
  });
});

router.delete('/delete-icon/:id', auth, async (req, res, next) => {
  // 
  const icon = await Icon.findByIdAndDelete(req.params.id).populate("category")


  const iconPath = `${UPLOAD_DIR}${icon.category.dir}/${icon.filename}`;

  try {
    await fs.stat(iconPath, async function (err, stats) {
      await fs.unlink(iconPath, async (err) => {
        res.status(200).send(icon._id)
      })
    });
  } catch (err) {
    res.status(500).send(err)
  }

})


router.post("/update-category", auth, async (req, res, next) => {
  const { icon, catId } = req.body;

  const newCat = await Category.findById(catId);

  const iconExtPath = `${UPLOAD_DIR}${icon.category.dir}/${icon.filename}`;
  const iconNewPath = `${UPLOAD_DIR}${newCat.dir}/${icon.filename}`;

  try {
    await fs.promises.rename(iconExtPath, iconNewPath, async (err) => {
      if (err)
      console.log(err)
    })
  } catch (err) {
      console.log(err)
    return
  }
  const editedIcon = await Icon.findByIdAndUpdate(icon._id, {
    category: catId
  })

  res.status(200).send(editedIcon._id)
});


module.exports = router;