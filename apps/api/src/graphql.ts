
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
    name: string;
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

export abstract class IQuery {
    abstract admins(query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<AdminList> | Promise<Nullable<AdminList>>;

    abstract adminLogs(username?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<AdminLogList> | Promise<Nullable<AdminLogList>>;

    abstract me(): Nullable<Admin> | Promise<Nullable<Admin>>;

    abstract warehouses(query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<WarehouseList> | Promise<Nullable<WarehouseList>>;

    abstract shops(query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<ShopList> | Promise<Nullable<ShopList>>;

    abstract products(warehouseId: string, query?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<ProductList> | Promise<Nullable<ProductList>>;

    abstract productLog(productId?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<ProductLogList> | Promise<Nullable<ProductLogList>>;

    abstract outbounds(warehouseId: string, shopId: string, pagination?: Nullable<PaginationInput>): Nullable<OutboundList> | Promise<Nullable<OutboundList>>;

    abstract demands(warehouseId?: Nullable<string>, shopId?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<DemandList> | Promise<Nullable<DemandList>>;

    abstract preparations(query?: Nullable<string>, warehouseId?: Nullable<string>, shopId?: Nullable<string>): Nullable<PreparationList> | Promise<Nullable<PreparationList>>;

    abstract transactions(productId?: Nullable<string>, warehouseId?: Nullable<string>, shopId?: Nullable<string>, pagination?: Nullable<PaginationInput>): Nullable<TransactionList> | Promise<Nullable<TransactionList>>;

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

    abstract addPreparation(warehouseId: string, shopId: string): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addMissing(preparationId: string, productId: string, amount: number): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addTransaction(preparationId: string): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addInbound(warehouseId: string, items: Nullable<ProductAmountInput>[]): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;

    abstract addTransfer(warehouseId: string, destinationId: string, items: Nullable<ProductAmountInput>[]): Nullable<IdPayload> | Promise<Nullable<IdPayload>>;
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
    action: string;
    createdAt: string;
    remarks?: Nullable<string>;
}

export class ProductList {
    data?: Nullable<Nullable<Product>[]>;
}

export class Product {
    id: string;
    name: string;
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
}

export class PreparationList {
    data: Nullable<Preparation>[];
}

export class Preparation {
    id: string;
    warehouseId: string;
    shopId: string;
    createdBy: string;
    createdAt: string;
    items?: Nullable<Nullable<PreparationItem>[]>;
}

export class PreparationItem {
    productId: string;
    expected: number;
    actual: number;
}

export class TransactionList {
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
