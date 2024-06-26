
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN_MANAGER = "ADMIN_MANAGER"
}

export class PaginationInput {
    offset?: Nullable<number>;
    limit?: Nullable<number>;
}

export class IdInput {
    id: string;
}

export class AddAdminInput {
    username: string;
    password: string;
    role: Role;
    warehouse?: Nullable<Nullable<string>[]>;
}

export class EditAdminInput {
    username: string;
    role?: Nullable<Role>;
    warehouses?: Nullable<Nullable<string>[]>;
    active?: Nullable<boolean>;
    password?: Nullable<string>;
}

export class ChangeMyPasswordInput {
    oldPassword: string;
    newPassword: string;
}

export class ProductInput {
    id: string;
    name?: Nullable<string>;
    price?: Nullable<number>;
}

export class StockProductInput {
    id: string;
    warehouse: string;
    stock: number;
}

export class ProductAmountInput {
    productId: string;
    amount: number;
}

export class AddShopInput {
    id: string;
    name: string;
}

export class EditShopInput {
    id: string;
    name?: Nullable<string>;
    active?: Nullable<boolean>;
}

export class AddWarehouseInput {
    id: string;
    name: string;
    features?: Nullable<Nullable<string>[]>;
}

export class EditWarehouseInput {
    id: string;
    name?: Nullable<string>;
    features?: Nullable<Nullable<string>[]>;
    active?: Nullable<boolean>;
}

export class AddMissingInput {
    preparationId: string;
    productId: string;
    missingAmount: number;
}

export class AddTransactionInput {
    preparationId: string;
}

export abstract class IQuery {
    abstract admins(query?: Nullable<string>, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<Nullable<Admin>[]> | Promise<Nullable<Nullable<Admin>[]>>;

    abstract adminLogs(username?: Nullable<string>, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<Nullable<AdminLog>[]> | Promise<Nullable<Nullable<AdminLog>[]>>;

    abstract me(): Nullable<Admin> | Promise<Nullable<Admin>>;

    abstract warehouses(query?: Nullable<string>, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<Nullable<Warehouse>[]> | Promise<Nullable<Nullable<Warehouse>[]>>;

    abstract shops(query?: Nullable<string>): Nullable<Nullable<Shop>[]> | Promise<Nullable<Nullable<Shop>[]>>;

    abstract products(warehouseId: string, query?: Nullable<string>, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;

    abstract productStock(productId: string): Nullable<ProductStock> | Promise<Nullable<ProductStock>>;

    abstract getProductsByIds(ids: Nullable<string>[]): Nullable<Nullable<ProductStock>[]> | Promise<Nullable<Nullable<ProductStock>[]>>;

    abstract searchProduct(query?: Nullable<string>, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<ProductStock>[]> | Promise<Nullable<Nullable<ProductStock>[]>>;

    abstract productLog(productId?: Nullable<string>, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<ProductLog[]> | Promise<Nullable<ProductLog[]>>;

    abstract outbounds(warehouseId: string): Nullable<Nullable<Outbound>[]> | Promise<Nullable<Nullable<Outbound>[]>>;

    abstract demands(warehouseId?: Nullable<string>, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<Demand>[]> | Promise<Nullable<Nullable<Demand>[]>>;

    abstract preparations(query?: Nullable<string>, warehouseId?: Nullable<string>): Nullable<PreparationList> | Promise<Nullable<PreparationList>>;

    abstract transactions(query?: Nullable<string>, warehouseId?: Nullable<string>, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Nullable<TransactionResponse>[]> | Promise<Nullable<Nullable<TransactionResponse>[]>>;

    abstract inbounds(warehouseId: string, pagination?: Nullable<PaginationInput>): Nullable<InboundList> | Promise<Nullable<InboundList>>;

    abstract transfers(warehouseId: string, destinationId: string, pagination?: Nullable<PaginationInput>): Nullable<TransferList> | Promise<Nullable<TransferList>>;
}

export abstract class IMutation {
    abstract login(username: string, password: string): Nullable<SessionPayload> | Promise<Nullable<SessionPayload>>;

    abstract addAdmin(input?: Nullable<AddAdminInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract editAdmin(input?: Nullable<EditAdminInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract changeMyPassword(input?: Nullable<ChangeMyPasswordInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract addWarehouse(input?: Nullable<AddWarehouseInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editWarehouse(input?: Nullable<EditWarehouseInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addShop(input?: Nullable<AddShopInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editShop(input?: Nullable<EditShopInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addProducts(input?: Nullable<Nullable<ProductInput>[]>): Nullable<CountPayload> | Promise<Nullable<CountPayload>>;

    abstract editProduct(input?: Nullable<ProductInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editProductStock(input?: Nullable<StockProductInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addOutbound(warehouseId: string, shopId: string, items: Nullable<ProductAmountInput>[]): Nullable<OutboundResponse> | Promise<Nullable<OutboundResponse>>;

    abstract addPreparation(warehouseId: string, shopId: Nullable<string>[]): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addMissing(preparationId: string, productId: string, amount: number): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addTransaction(preparationId: string, remarks?: Nullable<string>): Nullable<TransactionResponse> | Promise<Nullable<TransactionResponse>>;

    abstract addInbound(warehouseId: string, items: Nullable<ProductAmountInput>[]): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addTransfer(warehouseId: string, destinationId: string, items: Nullable<ProductAmountInput>[]): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract updateDemand(demandId: string, expiredAt?: Nullable<string>, amount?: Nullable<number>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;
}

export class IdPayload {
    id: string;
}

export class CountPayload {
    count: number;
}

export class AdminList {
    data?: Nullable<Nullable<Admin>[]>;
}

export class AdminPayload {
    username: string;
}

export class SessionPayload {
    session: string;
}

export class Admin {
    username: string;
    role: Role;
    warehouses: Nullable<string>[];
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export class AdminLogList {
    data?: Nullable<Nullable<AdminLog>[]>;
}

export class AdminLog {
    id: string;
    action: string;
    createdAt: string;
    remarks?: Nullable<string>;
}

export class ProductStock {
    id: string;
    name: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    stocks?: Nullable<Nullable<ProductStockAmount>[]>;
}

export class ProductStockAmount {
    warehouseId: string;
    amount: number;
}

export class ProductList {
    data?: Nullable<Nullable<Product>[]>;
}

export class Product {
    id: string;
    name: string;
    price: number;
    stock: Stock;
    createdAt: string;
    updatedAt: string;
}

export class Stock {
    amount: number;
    all: number;
    topWarehouse: string;
    topAmount: number;
    updatedAt: string;
}

export class ProductLogList {
    data?: Nullable<Nullable<ProductLog>[]>;
}

export class ProductLog {
    id: string;
    warehouse: string;
    amount: number;
    createdAt: string;
    createdBy: string;
    action: string;
    remarks?: Nullable<string>;
}

export class ProductAmount {
    id: string;
    product: string;
    amount: number;
}

export class ShopList {
    data?: Nullable<Nullable<Shop>[]>;
}

export class Shop {
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export class WarehouseList {
    data?: Nullable<Nullable<Warehouse>[]>;
}

export class Warehouse {
    id: string;
    name: string;
    active: boolean;
    features?: Nullable<Nullable<string>[]>;
    createdAt: string;
    updatedAt: string;
}

export class OutboundList {
    data: Nullable<Outbound>[];
}

export class Outbound {
    id: string;
    createdAt: string;
    createdBy: string;
    shopId: string;
    warehouseId: string;
    productId: string;
    amount: number;
}

export class OutboundResponse {
    outbounds: Nullable<IdPayload>[];
    demands?: Nullable<Nullable<IdPayload>[]>;
}

export class DemandList {
    data: Nullable<Demand>[];
}

export class Demand {
    id: string;
    warehouseId: string;
    shopId: string;
    productId?: Nullable<string>;
    amount: number;
    createdAt: string;
    createdBy: string;
    expiredAt: string;
}

export class PreparationList {
    data?: Nullable<Nullable<Preparation>[]>;
}

export class Preparation {
    id: string;
    warehouseId: string;
    createdBy: string;
    createdAt: string;
    shops?: Nullable<Nullable<string>[]>;
    items?: Nullable<Nullable<PreparationItem>[]>;
}

export class PreparationItem {
    productId: string;
    expected: number;
    actual: number;
}

export class TransactionResponse {
    id: string;
    shops?: Nullable<Nullable<string>[]>;
    warehouseId: string;
    createdAt: string;
    createdBy: string;
    items?: Nullable<Nullable<TransactionItemResponse>[]>;
    failed?: Nullable<Nullable<TransactionItemResponse>[]>;
}

export class TransactionItemResponse {
    productId: string;
    amount: number;
}

export class Transaction {
    id: string;
    shopId: string;
    warehouseId: string;
    createdAt: string;
    createdBy: string;
    items?: Nullable<Nullable<TransactionItem>[]>;
    failed?: Nullable<Nullable<TransactionItem>[]>;
}

export class TransactionItem {
    id: string;
    productId: string;
    amount: number;
}

export class InboundList {
    data?: Nullable<Nullable<Inbound>[]>;
}

export class Inbound {
    id: string;
    warehouse: string;
    items?: Nullable<Nullable<ProductAmount>[]>;
    createdAt: string;
    createdBy: string;
}

export class TransferList {
    data?: Nullable<Nullable<Transfer>[]>;
}

export class Transfer {
    id: string;
    source: string;
    destination: string;
    items?: Nullable<Nullable<ProductAmount>[]>;
    createdAt: string;
    createdBy: string;
}

type Nullable<T> = T | null;
