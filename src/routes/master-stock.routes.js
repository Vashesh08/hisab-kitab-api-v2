// const express = require('express');
// const masterStockRouter = express.Router();
// const masterStockController = require('../controller/master-stock.controller');

// masterStockRouter.get('/:id', masterStockController.getStock);
// masterStockRouter.get('/', masterStockController.getStocks);
// masterStockRouter.post('/', masterStockController.saveStock);
// masterStockRouter.put('/:id', masterStockController.updateStock);
// masterStockRouter.delete('/:id', masterStockController.deleteStock);
const getFilteredMasterStockInfo = require('../utility/filterDeleted');
const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose");


module.exports = function (fastify, opts, next) {

    const masterStockDetailsSchema = {
        schema: {
            description: 'Only authenticate access',
            tags: ['MasterStock'],
            summary: 'Get master Stock details',
            security: [{ apiKey: [] }],
        },
        preHandler: fastify.auth([fastify.jwtAuth])
    }


    fastify.get('/masterStock', masterStockDetailsSchema, async (request, reply) => {
        reply.type('application/json').code(200)
        const MasterStock = mongoose.model('master-stock')
        let stock;
        if (request.isAdminUser) {
            if (!request.headers.masterStock_id) {
                return { success: false, message: 'Missing masterStock_id  in header' };
            }
            stock = await MasterStock.findOne({ _id: request.headers.masterStock_id });
            if (!stock) {
                return { success: false, message: 'Missing masterStock info' };
            }
        } else {
            stock = await MasterStock.findOne({ user_id: request.user._id });
        }
        return getFilteredMasterStockInfo(stock);
    });

    const updatMasterStockSchema = {
        schema: {
            description: 'Only authenticate access',
            tags: ['MasterStock'],
            summary: 'Update MasterStock details',
            security: [{ apiKey: [] }],
            body: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    type: { type: 'string' },
                    date: { type: 'string' },
                    category: { type: 'string' },
                    description: { type: 'string' },
                    weight: { type: 'string' },
                    issuer: { type: 'string' },
                    receiver: { type: 'string' },
                    purity: { type: 'string' },
                    createdBy: { type: 'string' },
                    modifiedBy: { type: 'string' },
                },
            },
        },

        preHandler: fastify.auth([fastify.jwtAuth])
    }

    fastify.post('/masterStock', updatMasterStockSchema, async (request, reply) => {
        reply.type('application/json').code(200)
        const MasterStock = mongoose.model('master-stock')
        const User = mongoose.model('User')
        let existingMasterStock;
        console.log(request.headers);
        if (request.isAdminUser) {
            if (!request.headers.masterstock_id) {
                return { success: false, message: 'Missing masterStock_id  in header' };
            }
            existingMasterStock = await MasterStock.findOne({ _id: request.headers.masterstock_id });
            if (!existingMasterStock) {
                return { success: false, message: 'Missing masterStockInfo' };
            }
        } else {
            existingMasterStock = await MasterStock.findOne({ user_id: request.user._id })
        }
        const _id = !!existingMasterStock ? existingMasterStock._id : uuidv4();

        const masterStock_data = {
            masterStock_id: _id,
            // created_by: request.body.created_by,
            modified_by: request.user.email,
            type: request.body.type,
            date: request.body.date,
            category: request.body.category,
            description: request.body.description,
            weight: request.body.weight,
            issuer: request.body.issuer,
            receiver: request.body.receiver,
            purity: request.body.purity,
            createdBy: request.user.email,
            modifiedBy: request.user.email,
            }
            const cleaned_masterStock_data = masterStock_data;
            if (!request.isAdminUser) {
                cleaned_masterStock_data.user_id = request.user._id;
    
            }
            let masterStock
            if (!existingMasterStock) {
                console.log("Tesing the provider");
                masterStock = await MasterStock.findOneAndUpdate(
                    { _id },
                    cleaned_masterStock_data,
                    { useFindAndModify: true, upsert: true, new: true }
                );
            }
            else {
                masterStock = existingMasterStock
                await masterStock.set({ ...masterStock, ...cleaned_masterStock_data });
                await masterStock.save();
    
                await User.findOneAndUpdate({ _id: masterStock.user_id }, 
                                            { $set: { username:request.body.contact_email, email: request.body.contact_email } });
    
            }

            return getFilteredMasterStockInfo(masterStock);


    });
    next()

}
