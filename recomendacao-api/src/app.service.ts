import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { ProductsRecommendationDto } from './dto/products-recommendation.dto';

@Injectable()
export class AppService {
  constructor() { }


  async getMostPopular() {
    const mostPopularProducts = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json');

    if (!mostPopularProducts) {
      throw new HttpException('Erro ao consultar as recomendações', HttpStatus.BAD_REQUEST);
    }

    const data = await Promise.all(
      mostPopularProducts.data.map(product => this.checkAvailableProducts(product))
    )

    return data;
  }

  async getPriceReduction() {
    const priceReductionProducts = await axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json');

    if (!priceReductionProducts) {
      throw new HttpException('Erro ao consultar as recomendações', HttpStatus.BAD_REQUEST);
    }

    const data = await Promise.all(
      priceReductionProducts.data.map(product => this.checkAvailableProducts(product))
    )

    return data;
  }

  async getRecommendation(maxProducts?: number) {
    if (maxProducts && maxProducts < 10)
      maxProducts = 10;


    const mostPopular = await this.getMostPopular();

    const priceReduction = await this.getPriceReduction();


    const response = [
      {
        title: "Most Popular",
        data: maxProducts ? mostPopular.slice(0, maxProducts) : mostPopular
      },
      {
        title: 'Price Reduction',
        data: maxProducts ? priceReduction.slice(0, maxProducts) : priceReduction
      }
    ]

    return response;

  }

  async checkAvailableProducts(products: ProductsRecommendationDto): Promise<any> {

    try {
      const product = await axios.get(`http://localhost:3000/produto/complete/${products.recommendedProduct.id}`)
      if (product.data.status == 'AVAILABLE') {
        return product.data;
      }
      return { esgotado: true }

    } catch (err) {
      // Tratativa de erro;
      return { esgotado: true }

    }


  }

}
