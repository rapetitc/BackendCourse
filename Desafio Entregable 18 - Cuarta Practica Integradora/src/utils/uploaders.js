import multer from "multer";
import { mkdir } from "fs";
import { resolve } from "path";
import ErrorHandler from "./errorsHandler.js";

const acceptedImgs = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export const uploadProfilePicture = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uid = req.params.uid === "this" ? req.user._id : req.params.uid;
      const folder = `./storage/users/${uid}/`;
      mkdir(folder, { recursive: true }, (error) => {
        if (error) ErrorHandler.create(error);
        else cb(null, resolve(folder));
      });
    },
    filename: function (req, file, cb) {
      cb(null, "profile_picture" + `.${acceptedImgs[file.mimetype]}`);
    },
  }),
  limits: { fieldSize: 10 },
  fileFilter: function (req, file, cb) {
    if (acceptedImgs[file.mimetype]) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadUserDocs = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uid = req.params.uid === "this" ? req.user._id : req.params.uid;
      const folder = `./storage/users/${uid}/documents`;
      mkdir(resolve(folder), { recursive: true }, (error) => {
        if (error) ErrorHandler.create(error);
        else cb(null, resolve(folder));
      });
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + `.${mimetypes[file.mimetype]}`);
    },
  }),
  limits: { fieldSize: 10 },
  fileFilter: function (req, file, cb) {
    if (acceptedImgs[file.mimetype]) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
