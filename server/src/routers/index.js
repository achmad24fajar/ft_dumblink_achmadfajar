const express = require("express")
const router = express.Router()

const { uploadFile } = require('../middlewares/upload')
const { authenticated } = require('../middlewares/auth')

// Place here your own routes
// Authentication Import Variables
const { registerUser, loginUser, editUser, getUserLogin } = require('../controllers/AuthController')

// Links Import Variables
const { postAllSosmedsByLink, getAllByLink, getAllLink, deleteLink, getLink, deleteLinks, updateLink } = require('../controllers/LinkController')

// Authentication Routes
router.post( '/register', registerUser )
router.post( '/login', loginUser )
router.patch( '/user', authenticated, editUser );
router.get( '/user', authenticated, getUserLogin )

// Links Routes
router.post( '/link', authenticated, uploadFile("image", "imageLink"), postAllSosmedsByLink );
router.get( '/link/:uniqueLink', authenticated, getAllByLink );
router.get( '/links', authenticated, getAllLink );
router.get( '/edit/link/:id', authenticated, getLink );
router.patch( '/update/link/:id', authenticated, uploadFile("image", "imageLink"), updateLink );
router.delete( '/link/:id', authenticated, deleteLink );

router.delete( '/links/:id', authenticated, deleteLinks );

module.exports = router