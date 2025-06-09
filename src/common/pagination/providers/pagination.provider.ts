import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Request object to access request data
     */
    @Inject(REQUEST)
    private readonly request: Request
  ) {}  
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    let results = await repository.find({
        skip: ((paginationQuery.page ?? 1) - 1) * (paginationQuery.limit ?? 10),
        take: paginationQuery.limit ?? 10,
    });

    const baseURL = this.request.protocol + '://' + this.request.headers.host + '/';
    const newURL = new URL(this.request.url, baseURL);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (paginationQuery.limit ?? 10));
    const currentPage = paginationQuery.page ?? 1;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const page = paginationQuery.page ?? 1;
    const previousPage = page === 1 ? page : page - 1;

    const finalResponse : Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit ?? 10,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: currentPage,
      },
      links: {
        first: newURL.origin + newURL.pathname + `?page=1&limit=${paginationQuery.limit ?? 10}`,
        last: newURL.origin + newURL.pathname + `?page=${totalPages}&limit=${paginationQuery.limit ?? 10}`,
        current: newURL.origin + newURL.pathname + `?page=${currentPage}&limit=${paginationQuery.limit ?? 10}`,
        next: newURL.origin + newURL.pathname + `?page=${nextPage}&limit=${paginationQuery.limit ?? 10}`,
        previous: newURL.origin + newURL.pathname + `?page=${previousPage}&limit=${paginationQuery.limit ?? 10}`,
      },
    };
    return finalResponse;
  }


}
