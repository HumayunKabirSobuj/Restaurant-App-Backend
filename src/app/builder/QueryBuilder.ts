import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public query: Record<string, any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(queryModel: Query<T[], T>, query: Record<string, any>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // add search to query
  addSearch(searchableFields: string[]): this {
    if (this?.query?.search) {
      const searchTerm = this.query.search;
      const regex = new RegExp(searchTerm, 'i');    
      this.queryModel = this.queryModel.where({
        $or: searchableFields.map((field) => ({ [field]: regex })),
      });
    }
    return this;
  }

  // add filter to query
  addFilter(): this {
    const filter: Record<string, unknown> = { ...this.query };
    // exclude fields
    const excludeQuery: string[] = [
      'search',
      "sortBy",
      "sortOrder",
      'page',
      'limit',
      'fields',
    ];
;
    excludeQuery.forEach((field) => delete filter[field]);
    if(filter?.filter){

      this.queryModel = this.queryModel.find({author:filter?.filter} as FilterQuery<T>);
    }
    
  
    return this;
  }
  // add pagination to query
  addPagination(): this {
    const page = parseInt(this.query.page as string, 10) || 1;
    const limit = parseInt(this.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit || 0;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  // add sorting to query
  addSorting(): this {
    const sort = this?.query?.sortBy;
    const sortOrder = this.query?.sortOrder === 'desc' ? -1 : 1;
    this.queryModel = this.queryModel.sort({ [sort]: sortOrder });
    return this;
  }
  // add fields to query
  addFields(): this {
    const fields = this?.query?.fields?.split(',').join(' ');
    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}

export default QueryBuilder;