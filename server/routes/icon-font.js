const express = require("express");
const router = express.Router();
// const svgtofont = require("svgtofont");
const path = require('path');
const { Icon } = require('../models/icon')
const fsPromises = require('fs').promises;
const svgr = require('@svgr/core')
const _ = require("lodash");


const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

router.get("/", async (req, res, next) => {

    const icons = await Icon.find().populate("category");

    for (const icon of icons) {

        const iconFile = await fsPromises.readFile(`${UPLOAD_DIR}${icon.category.dir}/${icon.filename}`, (err) => {
            if (err) console.log(err)
        })

        const componentName = _.upperFirst(_.camelCase(icon.filename.replace(".svg", "")));
        //  .replace(/\w+/g,
        // function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})

        // fixingColor 
        const componentCode = await svgr.transform(
            iconFile.toString().replace(/#[0-9A-F]{6}/g, "currentColor"),
            {
                plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
                icon: "{props.size}",
                titleProp: icon.name,
                svgProps: {
                    width: "{props.size || 24}",
                    height: "{props.size || 24}",
                    ['stroke-width']: "{props.width || 2}"
                },
            },
            { componentName: componentName },
        )

        await fsPromises.writeFile(`${UPLOAD_DIR}/react/${icon.filename.replace(".svg", "")}.jsx`, componentCode, err => {
            if (err) {
                console.error(err);
            }
        });        
    }

    res.status(200).send(true)
})



module.exports = router;