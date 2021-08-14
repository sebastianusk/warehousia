
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}

export enum Features {
    INBOUND = "INBOUND",
    OUTBOUND = "OUTBOUND",
    TRANSFER = "TRANSFER"
}

export class PaginationInput {
    cursor?: Nullable<string>;
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
    role: Role;
    warehouse?: Nullable<Nullable<string>[]>;
}

export class DeactivateAdminInput {
    username: string;
}

export class ChangeMyPasswordInput {
    oldPassword: string;
    newPassword: string;
}

export class ChangeAdminPasswordInput {
    adminId: string;
    password: string;
}

export class ProductInput {
    id: string;
    name?: Nullable<string>;
}

export class StockProductInput {
    id: string;
    warehouse: string;
    stock: number;
}

export class ProductAmountInput {
    productId?: Nullable<string>;
    amount: number;
}

export class ShopInput {
    id: string;
    name?: Nullable<string>;
}

export class WarehouseInput {
    id: string;
    name: string;
    features?: Nullable<Nullable<Features>[]>;
}

export class OutboundInput {
    warehouseId: string;
    shopId: string;
    items?: Nullable<Nullable<ProductAmountInput>[]>;
}

export class AddPreparationInput {
    shopId: string;
    warehouseId: string;
}

export class AddMissingInput {
    preparationId: string;
    productId: string;
    missingAmount: number;
}

export class AddTransactionInput {
    preparationId: string;
}

export class InboundInput {
    warehouseId: string;
    items?: Nullable<Nullable<ProductAmountInput>[]>;
}

export class TransferInput {
    sourceId: string;
    destId: string;
    items: Nullable<ProductAmountInput>[];
}

export abstract class IQuery {
    abstract admins(query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<AdminList> | Promise<Nullable<AdminList>>;

    abstract me(): Nullable<Admin> | Promise<Nullable<Admin>>;

    abstract warehouses(query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<WarehouseList> | Promise<Nullable<WarehouseList>>;

    abstract shops(query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<ShopList> | Promise<Nullable<ShopList>>;

    abstract products(warehouseId: string, query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<ProductList> | Promise<Nullable<ProductList>>;

    abstract outbounds(warehouseId: string, shopId: string, pagination?: Nullable<PaginationInput>): Nullable<Outbound> | Promise<Nullable<Outbound>>;

    abstract demands(warehouseId?: Nullable<string>, shopId?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<DemandList> | Promise<Nullable<DemandList>>;

    abstract preparations(preparationId?: Nullable<string>): Nullable<Preparation> | Promise<Nullable<Preparation>>;

    abstract transactions(productId?: Nullable<string>, warehouseId?: Nullable<string>, shopId?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<TransactionList> | Promise<Nullable<TransactionList>>;

    abstract inbounds(warehouseId: string, pagination?: Nullable<PaginationInput>): Nullable<Inbounds> | Promise<Nullable<Inbounds>>;

    abstract transfers(sourceId: string, destId: string, pagination?: Nullable<PaginationInput>): Nullable<Transfers> | Promise<Nullable<Transfers>>;
}

export abstract class IMutation {
    abstract addAdmin(input?: Nullable<AddAdminInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract editAdmin(input?: Nullable<EditAdminInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract deactiveAdmin(input?: Nullable<DeactivateAdminInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract changeAdminPassword(input?: Nullable<ChangeAdminPasswordInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract changeMyPassword(input?: Nullable<ChangeMyPasswordInput>): Nullable<AdminPayload> | Promise<Nullable<AdminPayload>>;

    abstract addWarehouse(input?: Nullable<WarehouseInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editWarehouse(input?: Nullable<WarehouseInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract deativeWarehouse(input?: Nullable<IdInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addShop(input?: Nullable<ShopInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editShop(input?: Nullable<ShopInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract deactiveShop(input?: Nullable<IdInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addProduct(input?: Nullable<ProductInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editProduct(input?: Nullable<ProductInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract editProductStock(input?: Nullable<StockProductInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addOutbound(input?: Nullable<OutboundInput>): Nullable<OutboundResponse> | Promise<Nullable<OutboundResponse>>;

    abstract addPreparation(input?: Nullable<AddPreparationInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addMissing(input?: Nullable<AddMissingInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addTransaction(input?: Nullable<AddTransactionInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addInbound(input?: Nullable<InboundInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addTransfer(input?: Nullable<TransferInput>): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;
}

export class IdPayload {
    id: string;
}

export class AdminList {
    cursor: string;
    data?: Nullable<Nullable<Admin>[]>;
}

export class AdminPayload {
    username: string;
}

export class Admin {
    username: string;
    role: Role;
    warehouse: Nullable<string>[];
    createdAt: string;
    updatedAt: string;
    log?: Nullable<Nullable<AdminLog>[]>;
}

export class AdminLog {
    action: string;
    createdAt: string;
    remarks?: Nullable<string>;
}

export class ProductList {
    cursor?: Nullable<string>;
    data?: Nullable<Nullable<Product>[]>;
}

export class Product {
    id: string;
    name: string;
    stock: Stock;
    createdAt: string;
    updatedAt: string;
    log?: Nullable<Nullable<ProductLog>[]>;
}

export class Stock {
    warehouse: Warehouse;
    amount: number;
    all: number;
    topWarehouse: Warehouse;
    topAmount: number;
}

export class ProductAmount {
    id: string;
    product: Product;
    amount: number;
}

export class ProductLog {
    id: string;
    action: string;
    amount: number;
    after: number;
    createdBy: Admin;
    createdAt: string;
}

export class ShopList {
    cursor: string;
    data?: Nullable<Nullable<Shop>[]>;
}

export class Shop {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export class WarehouseList {
    cursor: string;
    data?: Nullable<Nullable<Warehouse>[]>;
}

export class Warehouse {
    id: string;
    name: string;
    features?: Nullable<Nullable<Features>[]>;
    createdAt: string;
    updatedAt: string;
}

export class Outbound {
    id: string;
    createdAt: string;
    createdBy: Admin;
    shop: Shop;
    warehouse: Warehouse;
    items: Nullable<ProductAmount>[];
}

export class OutboundResponse {
    outbounds: Nullable<IdPayload>[];
    demands?: Nullable<Nullable<IdPayload>[]>;
}

export class DemandList {
    cursor: string;
    data: Nullable<Demand>[];
}

export class Demand {
    id: string;
    warehouse: Warehouse;
    shop: Shop;
    product?: Nullable<Product>;
    amount: number;
    createdAt: string;
    createdBy: Admin;
}

export class Preparation {
    id: string;
    warehouse: Warehouse;
    shop: Shop;
    items?: Nullable<Nullable<PreparationItem>[]>;
}

export class PreparationItem {
    product: Product;
    expected: number;
    actual: number;
}

export class TransactionList {
    cursor: string;
    data?: Nullable<Nullable<Transaction>[]>;
}

export class Transaction {
    id: string;
    shop: Shop;
    warehouse: Warehouse;
    items: Product;
    amount: number;
    createdAt: string;
    createdBy: string;
}

export class Inbounds {
    id: string;
    warehouse: Warehouse;
    items?: Nullable<Nullable<ProductAmount>[]>;
    createdAt: string;
    createdBy: string;
}

export class Transfers {
    id: string;
    source: Warehouse;
    destination: Warehouse;
    items?: Nullable<Nullable<ProductAmount>[]>;
    createdAt: string;
    createdBy: string;
}

type Nullable<T> = T | null;
