/* eslint-disable prettier/prettier */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  // ETH_RPC_URL: string;
  // CONTRACT_ADDRESS: string;
  PRIVATE_KEY: string;
  // ACCESS_CONTROL_ADDRESS: string;
  // BUILDING_TOKEN_ADDRESS: string;
  // COMMISSION_MANAGER_ADDRESS: string;
  // CONTRACT_MANAGER_ADDRESS: string;
  // MARKETPLACE_ADDRESS: string;
  // PROPERTY_MARKETPLACE_ADDRESS: string;
  // TOKEN_FACTORY_ADDRESS: string;
  // TRANSACTION_HANDLER_ADDRESS: string;
  // PROPERTY_TOKEN_ADDRESS: string;
  // ADMIN_WALLET_ADDRESS: string; // Agregado
  // ETH_USD_EXCHANGE_RATE: number; // Agregado
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    // ETH_RPC_URL: joi.string().required(),
    // CONTRACT_ADDRESS: joi.string().required(),
    PRIVATE_KEY: joi.string().required(),
    // ACCESS_CONTROL_ADDRESS: joi.string().required(),
    // BUILDING_TOKEN_ADDRESS: joi.string().required(),
    // COMMISSION_MANAGER_ADDRESS: joi.string().required(),
    // CONTRACT_MANAGER_ADDRESS: joi.string().required(),
    // MARKETPLACE_ADDRESS: joi.string().required(),
    // PROPERTY_MARKETPLACE_ADDRESS: joi.string().required(),
    // TOKEN_FACTORY_ADDRESS: joi.string().required(),
    // TRANSACTION_HANDLER_ADDRESS: joi.string().required(),
    // PROPERTY_TOKEN_ADDRESS: joi.string().required(),
    // ADMIN_WALLET_ADDRESS: joi.string().required(), // Agregado
    // ETH_USD_EXCHANGE_RATE: joi.number().required(), // Agregado
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  JWT_SECRET: envVars.JWT_SECRET,
  // ETH_RPC_URL: envVars.ETH_RPC_URL,
  // CONTRACT_ADDRESS: envVars.CONTRACT_ADDRESS,
  PRIVATE_KEY: envVars.PRIVATE_KEY,
  // ACCESS_CONTROL_ADDRESS: envVars.ACCESS_CONTROL_ADDRESS,
  // BUILDING_TOKEN_ADDRESS: envVars.BUILDING_TOKEN_ADDRESS,
  // COMMISSION_MANAGER_ADDRESS: envVars.COMMISSION_MANAGER_ADDRESS,
  // CONTRACT_MANAGER_ADDRESS: envVars.CONTRACT_MANAGER_ADDRESS,
  // MARKETPLACE_ADDRESS: envVars.MARKETPLACE_ADDRESS,
  // PROPERTY_MARKETPLACE_ADDRESS: envVars.PROPERTY_MARKETPLACE_ADDRESS,
  // TOKEN_FACTORY_ADDRESS: envVars.TOKEN_FACTORY_ADDRESS,
  // TRANSACTION_HANDLER_ADDRESS: envVars.TRANSACTION_HANDLER_ADDRESS,
  // PROPERTY_TOKEN_ADDRESS: envVars.PROPERTY_TOKEN_ADDRESS,
  // ADMIN_WALLET_ADDRESS: envVars.ADMIN_WALLET_ADDRESS, // Agregado
  // ETH_USD_EXCHANGE_RATE: envVars.ETH_USD_EXCHANGE_RATE, // Agregado
};
