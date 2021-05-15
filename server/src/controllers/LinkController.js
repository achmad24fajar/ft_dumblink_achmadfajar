const { Link, Sosmed, User } = require('../../models');
const Sequelize = require('sequelize');
const joi = require('joi');
const randomstring = require("randomstring");

exports.postAllSosmedsByLink = async (req, res) => {
	try{
		const { title, description, image, theme, dataLinks } = JSON.parse(req.body.link)

		// Generate unique link
		const uniqueLink = randomstring.generate(7);

		const postLink = await Link.create({
			title: title,
			description: description,
			image: req.files.image[0].filename,
			uniqueLink: uniqueLink,
			viewCount: 0,
			theme: theme,
			userId: req.userId.id
		})

		await dataLinks.forEach((data, index) => {
			const sosmed = Sosmed.create({
				titleLink: data.titleLink,
				urlLink: data.urlLink,
				imageLink: req.files.imageLink[index].filename,
				linkId: postLink.dataValues.id
			})
		})

		const link = await Link.findOne({
			where: {
				id : postLink.dataValues.id
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		})

		const links = await Sosmed.findAll({
			where: {
				linkId: postLink.dataValues.id
			},
			attributes:{
				exclude: [ 'linkId', 'createdAt', 'updatedAt' ]
			}
		})

		res.send({
			status: "Success",
			message: "Link was successfully save",
			data:{
				link: {
					...link.dataValues,
					links,
				}
			}
		})
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

exports.updateLink = async (req, res) => {
	try{
		const {id} = req.params
		const { title, description, image, dataLinks } = JSON.parse(req.body.link)

		console.log(req.files)
		
		let dataImage
		if(typeof image === 'object'){
			dataImage = req.files.image[0].filename
		} else {
			dataImage = image
		}

		const update = await Link.update({
			title: title,
			description: description,
			image: dataImage,
		},{
			where:{
				id
			}
		})

		await dataLinks.forEach((data, index) => {
			let dataImageLink
			if(typeof data.imageLink == 'object'){
				dataImageLink = req.files.imageLink[0].filename
			} else {
				dataImageLink = data.imageLink
			}
			const findSosmed = Sosmed.findOne({
				where: {
					id: data.id
				}
			})

			if(findSosmed){
				const sosmed = Sosmed.update({
					titleLink: data.titleLink,
					urlLink: data.urlLink,
					imageLink: dataImageLink,
				},{
					where: {
						id: data.id
					}
				})
			}
		})

		res.send({
			status: "Success",
			message: "Data was successfully updated"
		})

	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
} 

exports.getAllByLink = async (req, res) => {
	try{
		const { uniqueLink } = req.params

		const link = await Link.findOne({
			where: {
				uniqueLink : uniqueLink
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		})

		const links = await Sosmed.findAll({
			where: {
				linkId: link.id
			},
			attributes:{
				exclude: [ 'linkId', 'createdAt', 'updatedAt' ]
			}
		})

		res.send({
			status: "Success",
			data:{
				link: {
					...link.dataValues,
					links,
				}
			}
		})
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

exports.getAllLink = async (req, res) => {
	try{
		const linksFormDB = await Link.findAll({
			where: {
				userId: req.userId.id
			},
			include: [{
				model: Sosmed,
				attributes:{
					exclude: [ 'linkId', 'createdAt', 'updatedAt' ]
				}
			}],
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		})

		const linkString = JSON.stringify(linksFormDB);
    	const linkObject = JSON.parse(linkString);

    	const links = linkObject.map(link => {
    		return {
    			id: link.id,
    			title: link.title,
    			description: link.description,
    			uniqueLink: link.uniqueLink,
    			viewCount: link.viewCount,
    			theme: link.theme,
    			image: link.image,
    			links: {
    				...link.Sosmeds
    			}
    		}
    	})

		res.send({
			status: "Success",
			data:{
				links,
			}
		})
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

exports.deleteLink = async (req, res) => {
	try{
		const { id } = req.params

		await Link.destroy({
			where: {
				id,
			},
		});

		const sosmed = await Sosmed.findAll({
			where: {
				linkId: id
			}
		})

		if(sosmed){
			await Sosmed.destroy({
				where: {
					linkId: id
				}
			})
		}
		res.send({
			status: "Success",
			message: "Data was successfully deleted"
		})

	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

exports.getLink = async (req, res) => {
	try{
		const { id } = req.params

		const linkFromDB = await Link.findOne({
			where:{
				id,
			}
		})

		const links = await Sosmed.findAll({
			where: {
				linkId: linkFromDB.dataValues.id
			}
		})

		const link = {
			...linkFromDB.dataValues,
			links
		}

		res.send({
			status: "Success",
			data: {
				link
			}
		})
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

exports.deleteLinks = async (req, res) => {
	try{
		const { id } = req.params

		await Sosmed.destroy({
			where: {
				id: id
			}
		})

		res.send({
			status: "Success",
			message: "Data was successfully deleted"
		})

	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

