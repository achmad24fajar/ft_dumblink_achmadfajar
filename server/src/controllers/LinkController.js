const { Link, Sosmed, User } = require('../../models');
const Sequelize = require('sequelize');
const joi = require('joi');
const randomstring = require("randomstring");

exports.postAllSosmedsByLink = async (req, res) => {
	try{
		const { title, description, image, dataLinks } = JSON.parse(req.body.link)

		console.log(dataLinks)

		// Generate unique link
		const uniqueLink = randomstring.generate(7);

		const postLink = await Link.create({
			title: title,
			description: description,
			image: req.files.image[0].filename,
			uniqueLink: uniqueLink,
			viewCount: 0
		})

		await dataLinks.forEach((data, index) => {
			const sosmed = Sosmed.create({
				title: data.titleLink,
				url: data.urlLink,
				image: req.files.image[0].filename,
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

	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
}

