import multer from "multer";
import { mkdir } from "fs";
import { resolve } from "path";
import ErrorHandler from "./ErrorsHandler.js";

const acceptedImgs = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const mimetypes = {
  // TODO Borrar
  "audio/aac": "aac",
  "application/x-abiword": "abw",
  "application/postscript": "ai",
  "application/octet-stream": "dll",
  "video/x-msvideo": "avi",
  "application/vnd.amazon.ebook": "azw",
  "application/x-bzip": "bz",
  "application/x-bzip2": "bz2",
  "application/x-csh": "csh",
  "text/css": "css",
  "text/csv": "csv",
  "application/msword": "doc",
  "application/vnd.ms-fontobject": "eot",
  "application/epub+zip": "epub",
  "image/gif": "gif",
  "text/html": "html",
  "image/x-icon": "ico",
  "text/calendar": "ics",
  "application/java-archive": "jar",
  "image/jpeg": "jpg",
  "application/javascript": "js",
  "application/json": "json",
  "audio/midi": "midi",
  "audio/mpeg": "mp3",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "application/vnd.apple.installer+xml": "mpkg",
  "application/vnd.oasis.opendocument.presentation": "odp",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
  "application/vnd.oasis.opendocument.text": "odt",
  "audio/ogg": "oga",
  "video/ogg": "ogv",
  "application/ogg": "ogx",
  "font/otf": "otf",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/vnd.ms-powerpoint": "ppt",
  "application/x-rar-compressed": "rar",
  "application/rtf": "rtf",
  "application/x-sh": "sh",
  "image/svg+xml": "svg",
  "application/x-shockwave-flash": "swf",
  "application/x-tar": "tar",
  "image/tiff": "tiff",
  "application/typescript": "ts",
  "font/ttf": "ttf",
  "text/plain": "txt",
  "application/vnd.visio": "vsd",
  "audio/x-wav": "wav",
  "audio/webm": "weba",
  "video/webm": "webm",
  "image/webp": "webp",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "application/xhtml+xml": "xhtml",
  "application/vnd.ms-excel": "xlsx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx_OLD",
  "application/xml": "xml",
  "application/vnd.mozilla.xul+xml": "xul",
  "application/zip": "zip",
  "video/3gpp": "3gp",
  "video/3gpp2": "3gp2",
  "application/x-7z-compressed": "7z",
};

export const uploadProfilePicture = multer({
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
