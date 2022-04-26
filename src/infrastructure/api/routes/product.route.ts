import express, { Request, Response } from 'express';
import CreateProductUsecase from '../../../usecase/product/create/create.product.usecase';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequilize/product.repository';
import ProductPresenter from '../presenters/product.presenter';

export const productRoute = express.Router();

productRoute.post('/', async(req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository());
    try{
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        }
        const output = await usecase.execute(productDto);
        res.send(output);
    }catch(error){
        res.status(500).send(error);
    }
});



productRoute.get("/" , async(req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try{
        const output = await usecase.execute({});
        res.format({
            json: async() => res.send(output),
            xml: async() => res.send(ProductPresenter.listXML(output)),
        });
    }catch(error){
        res.status(500).send(error);
    }
});