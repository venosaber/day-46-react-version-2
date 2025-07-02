"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    handleFind(query, condition = { active: true }) {
        query.where(condition);
        return query;
    }
    handleSelect() {
        return this.repository.createQueryBuilder().select(this.columns);
    }
    handleOrder(query) {
        query.orderBy({ 'id': 'asc' });
        return query;
    }
    async getList(condition = { active: true }) {
        let query = this.handleSelect();
        query = this.handleFind(query, condition);
        query = this.handleOrder(query);
        return (await query.getRawMany()).map(obj => obj);
    }
    async create(data) {
        const newData = await this.repository
            .createQueryBuilder()
            .insert()
            .values(data)
            .returning(this.columns.join(', '))
            .execute();
        if (data.length > 1)
            return (0, utils_1.toCamelCase)(newData.raw);
        return (0, utils_1.toCamelCase)(newData.raw[0]);
    }
    async updateOne(id, data) {
        const query = this.repository
            .createQueryBuilder()
            .update()
            .set(data)
            .where("id = :id", { id })
            .returning(this.columns.join(', '));
        const newData = await query.execute();
        if (newData.affected === 0) {
            throw new common_1.NotFoundException(`Color with id ${id} not found`);
        }
        return (0, utils_1.toCamelCase)(newData.raw[0]);
    }
    async updateMany(data) {
        const metadata = this.repository.metadata;
        const idColumn = metadata.columns.find(col => col.propertyName === 'id');
        if (idColumn)
            idColumn.isGenerated = false;
        const result = await this.repository.upsert(data, ['id']);
        return result;
    }
    softDelete(id) {
        this.repository
            .createQueryBuilder()
            .update()
            .set({ active: false })
            .where("id = :id", { id })
            .execute();
        return { "msg": "deleted successfully" };
    }
    softDeleteMany(ids) {
        this.repository
            .createQueryBuilder()
            .update()
            .set({ active: false })
            .where("id in :id", { ids })
            .execute();
        return { "msg": "deleted successfully" };
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=service.js.map